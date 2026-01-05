import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { CartItem } from '../cart/models/cart-item.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
  paidAmount: number = 0;
  paymentType: string = '';
  transactionId: string = '';
  isPaymentSuccessful: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  // ngOnInit(): void {
  //   this.cartService.cart$.subscribe(items => {
  //     this.cartItems = items;
  //     this.totalAmount = this.getTotalPrice();
  //   });
  // }

  ngOnInit(): void {
  const nav = this.router.getCurrentNavigation(); 
  const state = nav?.extras?.state as { cartItems: CartItem[] }; 

  if (state?.cartItems) { 
    this.cartItems = state.cartItems;
    this.totalAmount = this.getTotalPrice();
  } else {
    this.cartItems = this.cartService.getCartItems(); 
    this.totalAmount = this.getTotalPrice();
  }
}


  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  }

  onPaymentSubmit(): void {
    if (this.paymentType) { 
      const userId = this.cartService.getUserId();
      if (userId) {
      this.cartService.makePayment(userId, this.totalAmount, this.paymentType, 1).subscribe(
          (paymentResponse: any) => {
            this.transactionId = paymentResponse.transactionId; 
            this.paidAmount = paymentResponse.amount; 

            this.cartService.completeOrder(userId, paymentResponse.id).subscribe(
              (orderResponse: any) => {
                this.isPaymentSuccessful = true;
                this.cartService.refreshCart();
              },
              (error) => {
                console.error('Error completing order:', error);
                alert('Payment successful but order completion failed. Please contact support.');
              }
            );
          },
          (error) => {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
          }
        );
      } else {
        alert('User not logged in.');
      }
    } else {
      alert('Please select a payment type.');
    }
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
