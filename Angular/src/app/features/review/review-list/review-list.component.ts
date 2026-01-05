import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review.model';
import { HotelService } from '../../userView/hoteluser/services/hotel.service';
import { FlightService } from '../../userView/flightuser/services/flight.service';
import { PackageService } from '../../userView/packageuser/services/package.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[] = [];
  hotelMap: { [hotelID: string]: string } = {};
  flightMap: { [flightID: string]: string } = {};
  packageMap: { [packageID: string]: string } = {};

  constructor(
    private reviewService: ReviewService,
    private hotelService: HotelService,
    private flightService: FlightService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
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

  loadReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: (data: Review[]) => {
        this.reviews = (data || []).map(r => {
          const normalizedProductId = typeof r.productId === 'string' ? r.productId.trim().toLowerCase() : '';
          const hotelName = this.hotelMap[normalizedProductId];
          const flightName = this.flightMap[normalizedProductId];
          const packageName = this.packageMap[normalizedProductId];

          const productName = hotelName || flightName || packageName || 'Unknown Product';
          const productType = hotelName ? 'hotel' : flightName ? 'flight' : packageName ? 'package' : 'unknown';
          const isMapped = productName !== 'Unknown Product' ? '✅ MAPPED' : '❌ NOT MAPPED';

          console.log(`Review ${r.reviewID} → productId: ${r.productId}, Name: ${productName}, Type: ${productType} ${isMapped}`);

          return {
            ...r,
            productName,
            productType
          };
        });
      },
      error: err => {
        console.error('Failed to load reviews:', err);
        alert('Could not load reviews.');
      }
    });
  }

  deleteReview(id: string): void {
    this.reviewService.deleteReview(id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.reviewID !== id);
      },
      error: err => {
        console.error('Failed to delete review:', err);
        alert('Could not delete review.');
      }
    });
  }
}
