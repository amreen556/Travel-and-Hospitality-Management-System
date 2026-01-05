import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './features/cart/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MapMyMoments';
  user: any = null;
  cartCount$: Observable<number>;
  isNavbarCollapsed = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserEmail(): string | null {
    return this.authService.getUserEmail();
  }

  hasWriterRole(): boolean {
    return this.user?.roles?.includes('Writer') ?? false;
  }

  hasAdminRole(): boolean {
    return this.user?.roles?.includes('Admin') ?? false;
  }
  
}
