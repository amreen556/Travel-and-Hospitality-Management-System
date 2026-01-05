import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel.model';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item.model';
import { ReviewService } from '../../../review/services/review.service';
import { Review } from '../../../review/models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-hotel-list-user',
  templateUrl: './hotel-list-user.component.html',
  styleUrls: ['./hotel-list-user.component.css']
})
export class HotelListUserComponent implements OnInit {
  hotels: Hotel[] = [];
  reviewForms: { [hotelID: string]: FormGroup } = {};
  allReviews: { [hotelID: string]: Review[] } = {};
  selectedRating: { [hotelID: string]: number } = {};
  searchTerm: string = '';
  priceRange: string = 'all';

  constructor(
    private hotelService: HotelService,
    private router: Router,
    private cartService: CartService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  get filteredHotels(): Hotel[] {
    return this.hotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      let matchesPrice = true;

      if (this.priceRange !== 'all') {
        const price = hotel.pricePerNight;
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

  loadHotels(): void {
    this.hotelService.getHotels().subscribe(hotelData => {
      this.hotels = hotelData;

      this.hotels.forEach(hotel => {
        // Load hotel image
        this.hotelService.getHotelImages(hotel.hotelID).subscribe(images => {
          if (images.length > 0) {
            hotel.imageUrl = images[0].url;
          }
        });

        // Initialize review form with validation
        this.reviewForms[hotel.hotelID] = this.fb.group({
          rating: ['', Validators.required],
          comment: ['', Validators.required]
        });

        // Initialize selected rating
        this.selectedRating[hotel.hotelID] = 0;

        // ✅ Fetch and enrich reviews for this hotel
        this.reviewService.getReviews().subscribe(all => {
          const normalizedHotelId = hotel.hotelID.trim().toLowerCase();
          this.allReviews[hotel.hotelID] = all
            .filter(r => r.productId?.trim().toLowerCase() === normalizedHotelId)
            .map(r => ({
              ...r,
              productName: hotel.name,
              productType: 'hotel'
            }));
        });
      });
    });
  }

  submitReview(hotelID: string): void {
    const form = this.reviewForms[hotelID];

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
      productId: hotelID,
      rating: Number(form.value.rating),
      comment: form.value.comment.trim()
    };

    console.log('Submitting review payload:', payload);

    this.reviewService.createReview(payload).subscribe({
      next: created => {
        const hotel = this.hotels.find(h => h.hotelID === hotelID);
        const enrichedReview: Review = {
          ...created,
          productName: hotel?.name || 'Unknown Hotel',
          productType: 'hotel'
        };

        if (!this.allReviews[hotelID]) {
          this.allReviews[hotelID] = [];
        }

        this.allReviews[hotelID].push(enrichedReview);
        form.reset();
        this.selectedRating[hotelID] = 0;
        this.router.navigate(['/user-review']);
      },
      error: err => {
        console.error('Review submission failed:', err);
        alert('Failed to submit review. Please check your input or try again.');
      }
    });
  }

  onStarClick(rating: number, hotelID: string): void {
    this.selectedRating[hotelID] = rating;
    this.reviewForms[hotelID].get('rating')?.setValue(rating);
  }

  addToCart(hotel: Hotel): void {
    const cartItem: CartItem = {
      id: '',
      orderBasketId: '',
      productId: hotel.hotelID,
      name: hotel.name,
      location: hotel.location,
      unitPrice: hotel.pricePerNight,
      imageUrl: hotel.imageUrl,
      quantity: 1,
      addedDate: new Date(),
      type: 'hotel'
    };

    this.cartService.addToCart(cartItem);
    alert(`${hotel.name} added to cart.`);
  }

  editHotel(id: string): void {
    this.router.navigate(['/hotels/edit', id]);
  }

  deleteHotel(id: string): void {
    this.router.navigate(['/hotels/delete', id]);
  }

  addHotel(): void {
    this.router.navigate(['/hotels/add']);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.priceRange = 'all';
  }
}
