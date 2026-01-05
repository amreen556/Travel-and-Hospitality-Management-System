import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface User {
  email: string;
  token: string;
  userId: string;
  roles: string[]; // ✅ Add this line
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>('https://localhost:7132/api/Auth/login', { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // Get userId from /api/auth/me/guid
          const headers = { 'Authorization': `Bearer ${user.token}` };
          this.http.get<any>('https://localhost:7132/api/Auth/me/guid', { headers }).subscribe(userIdResponse => {
            user.userId = userIdResponse.userId;
            this.cookieService.set('Authorization', `Bearer ${user.token}`);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          });
        }
        return user;
      }));
  }

  register(email: string, password: string) {
    return this.http.post<any>('https://localhost:7132/api/Auth/register', { email, password });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }

  getUserEmail(): string | null {
    const user = this.currentUserValue;
    return user ? user.email : null;
  }

  getUserId(): string | null {
    const user = this.currentUserValue;
    return user ? user.userId : null;
  }
}
