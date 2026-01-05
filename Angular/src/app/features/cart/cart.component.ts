import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartItem } from './models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; 
  hotelItems: CartItem[] = []; 
  flightItems: CartItem[] = [];
  packageItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      console.log('Cart items received:', items); 
      this.cartItems = items; //Store all cart item
      this.hotelItems = items.filter(item => item.type === 'hotel');// Filter items by type
      this.flightItems = items.filter(item => item.type === 'flight');
      this.packageItems = items.filter(item => item.type === 'package');
    });
  }

  hasItems(): boolean {
    return this.hotelItems.length > 0 || this.flightItems.length > 0 || this.packageItems.length > 0;
  }

  increaseQuantity(productId: string): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: string): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) return;
    this.cartService.updateQuantity(productId, quantity);
    this.refreshCart();
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.refreshCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.refreshCart();
  }

  getTotalPrice(): number {
    return [...this.hotelItems, ...this.flightItems, ...this.packageItems]
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  buyNow(): void {
    this.router.navigate(['/payment'], {
      state: { cartItems: this.cartItems }
    });
  }

  private refreshCart(): void {
    this.cartItems = this.cartService.getCartItems(); 
    this.hotelItems = this.cartItems.filter(item => item.type === 'hotel'); 
    this.flightItems = this.cartItems.filter(item => item.type === 'flight');
    this.packageItems = this.cartItems.filter(item => item.type === 'package');
  }
}
