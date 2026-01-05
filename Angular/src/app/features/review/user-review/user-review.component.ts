import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HotelService } from '../../userView/hoteluser/services/hotel.service';
import { FlightService } from '../../userView/flightuser/services/flight.service';
import { PackageService } from '../../userView/packageuser/services/package.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit {
  allReviews: Review[] = [];
  myReviews: Review[] = [];
  reviewForm!: FormGroup;
  editingReviewId: string | null = null;
  userID: string | null = null;
  selectedRating: number = 0;
  hotelMap: { [hotelID: string]: string } = {};
  flightMap: { [flightID: string]: string } = {};
  packageMap: { [packageID: string]: string } = {};

  constructor(
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private authService: AuthService,
    private hotelService: HotelService,
    private flightService: FlightService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.userID = this.authService.getUserId();
    if (!this.userID) {
      alert('User not authenticated. Please log in again.');
      return;
    }

    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.hotelService.getHotels().subscribe({
      next: hotels => {
        hotels.forEach(h => {
          const normalizedId = h.hotelID?.trim().toLowerCase();
          if (normalizedId) {
            this.hotelMap[normalizedId] = h.name;
            console.log(`Hotel loaded: ${normalizedId} → ${h.name}`);
          }
        });

        this.flightService.getFlights().subscribe({
          next: flights => {
            flights.forEach(f => {
              const normalizedId = f.flightID?.trim().toLowerCase();
              if (normalizedId) {
                this.flightMap[normalizedId] = f.airline;
                console.log(`Flight loaded: ${normalizedId} → ${f.airline}`);
              }
            });

            this.packageService.getPackages().subscribe({
              next: packages => {
                packages.forEach(p => {
                  const normalizedId = p.packageID?.trim().toLowerCase();
                  if (normalizedId) {
                    this.packageMap[normalizedId] = p.name;
                    console.log(`Package loaded: ${normalizedId} → ${p.name}`);
                  }
                });

                this.loadReviews();
              },
              error: err => {
                console.error('Failed to load packages:', err);
                alert('Could not load package data.');
              }
            });
          },
          error: err => {
            console.error('Failed to load flights:', err);
            alert('Could not load flight data.');
          }
        });
      },
      error: err => {
        console.error('Failed to load hotels:', err);
        alert('Could not load hotel data.');
      }
    });
  }

  private enrichReview(r: Review): Review {
    const rawId = typeof r.productId === 'string' ? r.productId.trim().toLowerCase() : null;

    if (!rawId) {
      console.warn(`Review ${r.reviewID} has missing or invalid productId`);
      return {
        ...r,
        productName: 'Unknown Product',
        productType: 'unknown'
      };
    }

    const hotelName = this.hotelMap[rawId];
    const flightName = this.flightMap[rawId];
    const packageName = this.packageMap[rawId];

    const productName = hotelName || flightName || packageName || 'Unknown Product';
    const productType = hotelName ? 'hotel' : flightName ? 'flight' : packageName ? 'package' : 'unknown';

    console.log(`ReviewID: ${r.reviewID}, productId: ${r.productId}, Name: ${productName}, Type: ${productType}`);

    return {
      ...r,
      productName,
      productType
    };
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: data => {
        console.log('HotelMap:', this.hotelMap);
        console.log('FlightMap:', this.flightMap);
        console.log('PackageMap:', this.packageMap);
        console.log('Current UserID:', this.userID);

        this.allReviews = (data || []).map(r => this.enrichReview(r));
        this.myReviews = this.allReviews.filter(r => r.userID === this.userID);
      },
      error: err => {
        console.error('Failed to load reviews:', err);
        alert('Could not load reviews. Please try again later.');
      }
    });
  }

  get otherReviews(): Review[] {
    return this.allReviews.filter(r => r.userID !== this.userID);
  }

  submitReview(): void {
    if (!this.editingReviewId || !this.reviewForm.valid || !this.userID) return;

    const formValue = this.reviewForm.value;
    const original = this.myReviews.find(r => r.reviewID === this.editingReviewId);
    if (!original) {
      alert('Original review not found.');
      return;
    }

    const payload: Review = {
      reviewID: original.reviewID,
      userID: this.userID,
      productId: original.productId,
      rating: Number(formValue.rating),
      comment: formValue.comment.trim(),
      timestamp: original.timestamp
    };

    this.reviewService.updateReview(this.editingReviewId, payload).subscribe({
      next: () => {
        this.loadReviews();
        this.editingReviewId = null;
        this.reviewForm.reset();
        this.selectedRating = 0;
      },
      error: err => {
        console.error('Failed to update review:', err);
        alert('Could not update review. Please try again.');
      }
    });
  }

  editReview(review: Review): void {
    this.editingReviewId = review.reviewID;
    this.selectedRating = review.rating;
    this.reviewForm.patchValue({
      rating: review.rating,
      comment: review.comment
    });
  }

  deleteReview(id: string): void {
    this.reviewService.deleteReview(id).subscribe({
      next: () => {
        this.myReviews = this.myReviews.filter(r => r.reviewID !== id);
        this.allReviews = this.allReviews.filter(r => r.reviewID !== id);
      },
      error: err => {
        console.error('Failed to delete review:', err);
        alert('Could not delete review. Please try again.');
      }
    });
  }

  cancelEdit(): void {
    this.editingReviewId = null;
    this.reviewForm.reset();
    this.selectedRating = 0;
  }

  onStarClick(rating: number): void {
    this.selectedRating = rating;
    this.reviewForm.get('rating')?.setValue(rating);
  }
}
