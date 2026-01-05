import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://localhost:7132/api/Review'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // ✅ Get all reviews
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  // ✅ Get a single review by ID
  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create a new review
  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  // ✅ Update an existing review
  updateReview(id: string, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  // ✅ Delete a review
  deleteReview(id: string): Observable<Review> {
    return this.http.delete<Review>(`${this.apiUrl}/${id}`);
  }
}
