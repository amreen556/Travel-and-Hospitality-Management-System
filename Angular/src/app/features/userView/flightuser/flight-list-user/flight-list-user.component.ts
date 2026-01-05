import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.model';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item.model';
import { ReviewService } from '../../../review/services/review.service';
import { Review } from '../../../review/models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-flight-list-user',
  templateUrl: './flight-list-user.component.html',
  styleUrls: ['./flight-list-user.component.css']
})
export class FlightListUserComponent implements OnInit {
  flights: Flight[] = [];
  reviewForms: { [flightID: string]: FormGroup } = {};
  allReviews: { [flightID: string]: Review[] } = {};
  selectedRating: { [flightID: string]: number } = {};
  searchTerm: string = '';
  priceRange: string = 'all';

  constructor(
    private flightService: FlightService,
    private router: Router,
    private cartService: CartService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  get filteredFlights(): Flight[] {
    return this.flights.filter(flight => {
      const matchesSearch = flight.airline.toLowerCase().includes(this.searchTerm.toLowerCase());
      let matchesPrice = true;
      if (this.priceRange !== 'all') {
        const price = flight.price;
        switch (this.priceRange) {
          case 'budget':
            matchesPrice = price <= 5000;
            break;
          case 'mid':
            matchesPrice = price > 5000 && price <= 10000;
            break;
          case 'luxury':
            matchesPrice = price > 10000;
            break;
        }
      }
      return matchesSearch && matchesPrice;
    });
  }

  loadFlights(): void {
    this.flightService.getFlights().subscribe(flightData => {
      this.flights = flightData;

      this.flights.forEach(flight => {
        // Load flight image
        this.flightService.getFlightImages(flight.flightID).subscribe(images => {
          if (images.length > 0) {
            flight.imageUrl = images[0].url;
          }
        });

        // Initialize review form
        this.reviewForms[flight.flightID] = this.fb.group({
          rating: ['', Validators.required],
          comment: ['', Validators.required]
        });

        // Initialize selected rating
        this.selectedRating[flight.flightID] = 0;
      });

      // Fetch and enrich reviews
      this.reviewService.getReviews().subscribe(all => {
        this.flights.forEach(flight => {
          const normalizedFlightId = flight.flightID.trim().toLowerCase();
          this.allReviews[flight.flightID] = all
            .filter(r => r.productId?.trim().toLowerCase() === normalizedFlightId)
            .map(r => ({
              ...r,
              productName: flight.airline,
              productType: 'flight'
            }));
        });
      });
    });
  }

  submitReview(flightID: string): void {
    const form = this.reviewForms[flightID];

    if (!form.valid) {
      alert('Please fill in both rating and comment before submitting.');
      return;
    }

    const userId = this.authService.getUserId();
    if (!userId) {
      alert('User not authenticated. Please log in again.');
      return;
    }

    const payload: Partial<Review> = {
      userID: userId,
      productId: flightID,
      rating: Number(form.value.rating),
      comment: form.value.comment.trim()
    };

    console.log('Submitting review payload:', payload);

    this.reviewService.createReview(payload).subscribe({
      next: created => {
        const flight = this.flights.find(f => f.flightID === flightID);
        const enrichedReview: Review = {
          ...created,
          productName: flight?.airline || 'Unknown Flight',
          productType: 'flight'
        };

        if (!this.allReviews[flightID]) {
          this.allReviews[flightID] = [];
        }
        this.allReviews[flightID].push(enrichedReview);

        form.reset();
        this.selectedRating[flightID] = 0;
        this.router.navigate(['/user-review']);
      },
      error: err => {
        console.error('Review submission failed:', err);
        alert('Failed to submit review. Please check your input or try again.');
      }
    });
  }

  onStarClick(rating: number, flightID: string): void {
    this.selectedRating[flightID] = rating;
    this.reviewForms[flightID].get('rating')?.setValue(rating);
  }

  addToCart(flight: Flight): void {
    const cartItem: CartItem = {
      id: '',
      orderBasketId: '',
      productId: flight.flightID,
      name: flight.airline,
      location: `${flight.departure} → ${flight.arrival}`,
      unitPrice: flight.price,
      imageUrl: flight.imageUrl,
      quantity: 1,
      addedDate: new Date(),
      type: 'flight'
    };

    this.cartService.addToCart(cartItem);
    alert(`${flight.airline} flight added to cart.`);
  }

  editFlight(id: string): void {
    this.router.navigate(['/flights/edit', id]);
  }

  deleteFlight(id: string): void {
    this.router.navigate(['/flights/delete', id]);
  }

  addFlight(): void {
    this.router.navigate(['/flights/add']);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.priceRange = 'all';
  }
}
