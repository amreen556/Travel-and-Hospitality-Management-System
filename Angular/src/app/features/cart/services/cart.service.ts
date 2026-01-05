import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { AuthService } from '../../../services/auth.service';
import {
  OrderBasket,
  OrderBasketItem,
  CreateOrderBasketDto,
  CreateOrderBasketItemDto,
  UpdateOrderBasketItemDto
} from '../models/order-basket.model';
import { HotelService } from '../../../features/userView/hoteluser/services/hotel.service';
import { FlightService } from '../../../features/userView/flightuser/services/flight.service';
import { PackageService } from '../../../features/userView/packageuser/services/package.service'; // ✅ Inject PackageService

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7132/api/Payment2';
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  public cart$ = this.cartSubject.asObservable();
  public cartCount$ = this.cartSubject.pipe(map(items => items.length)); 
  private orderBasketId: string | null = null; 
  private userId: string | null = null; 

  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private hotelService: HotelService,
    private flightService: FlightService,
    private packageService: PackageService 
  ) {
    this.authService.currentUser.subscribe(user => { 
      if (user && user.userId) {
        this.userId = user.userId;
        this.initializeCart();
      } 
      else {
        this.userId = null;
        this.orderBasketId = null;
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
      }
    });
  }

  getUserId(): string | null {
    return this.userId;
  }

  private getHeaders() {
    const token = this.authService.currentUserValue?.token;
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }

  private initializeCart(): void {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.getOrCreateOrderBasket().subscribe(basket => {
        this.orderBasketId = basket.id;
        this.loadCartItems();
      });
    }
  }

  private getOrCreateOrderBasket(): Observable<OrderBasket> {
    return this.http.get<OrderBasket>(`${this.apiUrl}/orderbasket/by-user/${this.userId}`).pipe( 
      catchError(() => {
        const dto: CreateOrderBasketDto = { userId: this.userId! };
        return this.http.post<OrderBasket>(`${this.apiUrl}/orderbasket`, dto);
      })
    );
  }

  
  private loadCartItems(): void { 
    if (!this.orderBasketId) return;

    this.http.get<OrderBasket>(`${this.apiUrl}/orderbasket/${this.orderBasketId}`).subscribe(basket => {
      const items = (basket.items || []).filter(item =>
        item.quantity > 0 &&
        item.productId !== '00000000-0000-0000-0000-000000000000' 
      );

      if (items.length === 0) {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        return;
      }

      const hotelItems = items.filter(item => item.type === 'hotel');
      const flightItems = items.filter(item => item.type === 'flight');
      const packageItems = items.filter(item => item.type === 'package');

      const hotelObservables = hotelItems.map(item =>
        this.hotelService.getHotel(item.productId).pipe(catchError(() => of(null))) 
      );
      const flightObservables = flightItems.map(item =>
        this.flightService.getFlight(item.productId).pipe(catchError(() => of(null)))
      );
      const packageObservables = packageItems.map(item =>
        this.packageService.getPackage(item.productId).pipe(catchError(() => of(null)))
      );

      const allObservables = [...hotelObservables, ...flightObservables, ...packageObservables];

      forkJoin(allObservables).subscribe(allProducts => {
        const allProductsNonNull = allProducts.filter(p => p !== null);

        const imageObservables = allProductsNonNull.map(product => {
          if (!product) return of('');
          if ('hotelID' in product) {
            return this.hotelService.getHotelImages(product.hotelID).pipe( 
              map(images => images.length > 0 ? images[0].url : ''), 
              catchError(() => of(''))
            );
          } else if ('flightID' in product) {
            return this.flightService.getFlightImages(product.flightID).pipe(
              map(images => images.length > 0 ? images[0].url : ''),
              catchError(() => of(''))
            );
          } else if ('packageID' in product) {
            return this.packageService.getPackageImages(product.packageID).pipe(
              map(images => images.length > 0 ? images[0].url : ''), 
              catchError(() => of(''))
            );
          } else {
            return of('');
          }
        });

        forkJoin(imageObservables).subscribe(imageUrls => {
          this.cartItems = items.map(item => {
            const product = allProductsNonNull.find(p => {
              if (!p) return false;
              return (p as any).hotelID === item.productId || (p as any).flightID === item.productId || (p as any).packageID === item.productId;
            });

            if (!product) return null; 

            const imageUrl = imageUrls[allProductsNonNull.indexOf(product)] || '';

            return {
              id: item.id,
              orderBasketId: item.orderBasketId,
              productId: item.productId,
              name: (() => {
                if (item.type === 'hotel') return (product as any).name ?? '';
                if (item.type === 'flight') return (product as any).airline ?? '';
                if (item.type === 'package') return (product as any).name ?? '';
                return '';
              })(),
              location: (() => {
                if (item.type === 'hotel') {
                  const location = (product as any).location;
                  if (location) {
                    const cleanedLocation = location.replace(/,/g, '').trim(); 
                    return cleanedLocation;
                  }
                  return '';
                }
                if (item.type === 'flight') return `${(product as any).departure ?? ''} → ${(product as any).arrival ?? ''}`;
                if (item.type === 'package') return 'Package Deal';
                return '';
              })(),
              unitPrice: item.unitPrice,
              imageUrl: imageUrl,
              quantity: item.quantity,
              addedDate: new Date(item.addedDate),
              type: item.type,
              includedHotels: item.type === 'package' ? (product as any).includedHotels : undefined,
              includedFlights: item.type === 'package' ? (product as any).includedFlights : undefined
            };
          }).filter(item => item !== null) as CartItem[];

          this.cartSubject.next(this.cartItems);
        });
      });
    });
  }

  addToCart(item: CartItem): void {
    if (!this.orderBasketId || !this.userId) {
      console.error('Order basket or user ID not initialized');
      return;
    }

    const existingItem = this.cartItems.find(cartItem => cartItem.productId === item.productId);
    if (existingItem) {
      const updateDto: UpdateOrderBasketItemDto = {
        productId: item.productId,
        quantity: existingItem.quantity + item.quantity,
        unitPrice: item.unitPrice,
        type: item.type
      };
      this.http.put(`${this.apiUrl}/orderbasketitem/${existingItem.id}`, updateDto, { headers: this.getHeaders() }).subscribe(() => {
        this.loadCartItems();
      });
    } else {
      const createDto: CreateOrderBasketItemDto = {
        orderBasketId: this.orderBasketId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        type: item.type
      };
      this.http.post(`${this.apiUrl}/orderbasketitem`, createDto).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        const updateDto: UpdateOrderBasketItemDto = {
          productId: item.productId,
          quantity: quantity,
          unitPrice: item.unitPrice,
          type: item.type
        };
        this.http.put(`${this.apiUrl}/orderbasketitem/${item.id}`, updateDto).subscribe(() => {
          this.loadCartItems();
        });
      }
    }
  }

  removeFromCart(productId: string): void {
    const item = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (item) {
      this.http.delete(`${this.apiUrl}/orderbasketitem/${item.id}`).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    if (!this.orderBasketId) return;

    this.http.get<OrderBasket>(`${this.apiUrl}/orderbasket/${this.orderBasketId}`).subscribe(basket => {
      const items = basket.items || [];
      items.forEach(item => {
        this.http.delete(`${this.apiUrl}/orderbasketitem/${item.id}`).subscribe(() => {
          this.loadCartItems();
        });
      });
    });
  }

  refreshCart(): void {
    this.loadCartItems();
  }

  makePayment(userId: string, amount: number, method: string, status: number): Observable<any> {
    const paymentDto = {
      userId: userId,
      amount: amount,
      method: method,
      status: status,
      transactionId: ''
    };
    return this.http.post(`${this.apiUrl}/payment`, paymentDto, { headers: this.getHeaders() });
  }

  completeOrder(userId: string, paymentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete-order?UserId=${userId}&PaymentId=${paymentId}`, null, { headers: this.getHeaders() });
  }

  getOrdersByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/by-email?email=${email}`, { headers: this.getHeaders() });
  }
}
