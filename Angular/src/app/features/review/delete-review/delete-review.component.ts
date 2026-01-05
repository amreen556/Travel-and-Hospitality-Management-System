import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-delete',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const reviewID = this.route.snapshot.paramMap.get('id');
    if (reviewID) {
      this.reviewService.deleteReview(reviewID).subscribe({
        next: () => {
          // Navigate to review list after successful deletion
          this.router.navigate(['/reviews']);
        },
        error: (err) => {
          //Optionally navigate or show error message
          this.router.navigate(['/reviews']);
        }
      });
    }
  }
}
