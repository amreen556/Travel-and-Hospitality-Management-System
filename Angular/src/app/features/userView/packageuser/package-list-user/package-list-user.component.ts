import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../services/package.service';
import { Package } from '../models/package.model';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item.model';
import { ReviewService } from '../../../review/services/review.service';
import { Review } from '../../../review/models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-package-list-user',
  templateUrl: './package-list-user.component.html',
  styleUrls: ['./package-list-user.component.css']
})
export class PackageListUserComponent implements OnInit {
  packages: Package[] = [];
  reviewForms: { [packageID: string]: FormGroup } = {};
  allReviews: { [packageID: string]: Review[] } = {};
  selectedRating: { [packageID: string]: number } = {};
  searchTerm: string = '';
  priceRange: string = 'all';

  constructor(
    private packageService: PackageService,
    private router: Router,
    private cartService: CartService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  get filteredPackages(): Package[] {
    return this.packages.filter(pkg => {
      const matchesSearch = pkg.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      let matchesPrice = true;
      if (this.priceRange !== 'all') {
        const price = pkg.price;
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

  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;

      this.packages.forEach(pkg => {
        // Load package image
        this.packageService.getPackageImages(pkg.packageID).subscribe(images => {
          if (images.length > 0) {
            pkg.imageUrl = images[0].url;
          }
        });

        // Initialize review form
        this.reviewForms[pkg.packageID] = this.fb.group({
          rating: ['', Validators.required],
          comment: ['', Validators.required]
        });

        // Initialize selected rating
        this.selectedRating[pkg.packageID] = 0;
      });

      // Fetch and enrich reviews
      this.reviewService.getReviews().subscribe(all => {
        this.packages.forEach(pkg => {
          const normalizedId = pkg.packageID.trim().toLowerCase();
          this.allReviews[pkg.packageID] = all
            .filter(r => r.productId?.trim().toLowerCase() === normalizedId)
            .map(r => ({
              ...r,
              productName: pkg.name,
              productType: 'package'
            }));
        });
      });
    });
  }

  submitReview(packageID: string): void {
    const form = this.reviewForms[packageID];

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
      productId: packageID,
      rating: Number(form.value.rating),
      comment: form.value.comment.trim()
    };

    console.log('Submitting review payload:', payload);

    this.reviewService.createReview(payload).subscribe({
      next: created => {
        const pkg = this.packages.find(p => p.packageID === packageID);
        const enrichedReview: Review = {
          ...created,
          productName: pkg?.name || 'Unknown Package',
          productType: 'package'
        };

        if (!this.allReviews[packageID]) {
          this.allReviews[packageID] = [];
        }
        this.allReviews[packageID].push(enrichedReview);

        form.reset();
        this.selectedRating[packageID] = 0;
        this.router.navigate(['/user-review']);
      },
      error: err => {
        console.error('Review submission failed:', err);
        alert('Failed to submit review. Please check your input or try again.');
      }
    });
  }

  onStarClick(rating: number, packageID: string): void {
    this.selectedRating[packageID] = rating;
    this.reviewForms[packageID].get('rating')?.setValue(rating);
  }

  addToCart(pkg: Package): void {
    const cartItem: CartItem = {
      id: '',
      orderBasketId: '',
      productId: pkg.packageID,
      name: pkg.name,
      location: `${pkg.includedHotels}, ${pkg.includedFlights}`,
      unitPrice: pkg.price,
      imageUrl: pkg.imageUrl,
      quantity: 1,
      addedDate: new Date(),
      type: 'package'
    };
    this.cartService.addToCart(cartItem);
    alert(`${pkg.name} package added to cart.`);
  }

  editPackage(id: string): void {
    this.router.navigate(['/packages/edit', id]);
  }

  deletePackage(id: string): void {
    this.router.navigate(['/packages/delete', id]);
  }

  addPackage(): void {
    this.router.navigate(['/packages/add']);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.priceRange = 'all';
  }
}
