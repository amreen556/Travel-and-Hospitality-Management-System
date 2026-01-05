import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  userEmail: string | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = this.authService.currentUserValue?.email || null;
    if (this.userEmail) {
      this.loading = true;
      this.cartService.getOrdersByEmail(this.userEmail).subscribe({
        next: (data) => {
          this.orders = data || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load orders.';
          this.loading = false;
        }
      });
    } else {
      this.error = 'User not logged in.';
    }
  }
}
