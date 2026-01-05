import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

interface Order {
  id: string;
  userId: string;
  email: string;
  paymentId: string;
  status: number;
  createdDate: string;
  updatedDate: string;
  statusString: string;
}

interface User {
  UserID?: string;
  Name: string;
  Email: string;
  Password?: string;
  Role?: string;
  ContactNumber: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  profile: any = null;
  token: string | null = null;
  errorMessage = '';
  copied = false;
  useremail: string | null = null;
  userId: string | null = null;
  roles: string[] = [];

  profileVisible = true;
  ordersVisible = false;
  ordersLoading = false;
  ordersError = '';
  orders: Order[] = [];

  extraUserInfoVisible = false;
  extraUserInfoLoading = false;
  extraUserInfoError = '';
  extraUserInfo: User | null = null;

  extraUserInfoUpdating = false;
  extraUserInfoUpdateError = '';
  extraUserInfoUpdateSuccess = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.errorMessage = 'No token found. Please login.';
      return;
    }

    const parsed = JSON.parse(userData);
    this.token = parsed.token;
    this.useremail = parsed.email;

    if (!this.token) {
      this.errorMessage = 'Token is missing in user data.';
      return;
    }

    this.cookieService.set('Authorization', this.token, {
      path: '/',
      secure: true,
      sameSite: 'None'
    });

    try {
      const decoded: any = jwtDecode(this.token);
      this.userId = decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const roleClaim = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
    } catch {
      this.errorMessage = 'Failed to decode token.';
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get('https://localhost:7132/api/Auth/token-details', { headers }).subscribe({
      next: (data: any) => this.profile = data,
      error: () => this.errorMessage = 'Failed to load profile.'
    });
  }

  canViewToken(): boolean {
    return this.roles.includes('Admin') || this.roles.includes('Writer');
  }

  copyToken(): void {
    if (this.token) {
      navigator.clipboard.writeText(this.token).then(() => {
        this.copied = true;
        setTimeout(() => this.copied = false, 1500);
      });
    }
  }

  toggleProfile(): void {
    this.profileVisible = !this.profileVisible;
  }

  toggleOrders(): void {
    if (!this.useremail || !this.token) {
      this.ordersError = 'User email or token not available.';
      return;
    }

    if (this.ordersVisible) {
      this.ordersVisible = false;
      return;
    }

    this.ordersVisible = true;
    this.ordersLoading = true;
    this.ordersError = '';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const encodedEmail = encodeURIComponent(this.useremail);

    this.http.get<Order[]>(`https://localhost:7132/api/Payment2/orders/by-email?email=${encodedEmail}`, { headers }).subscribe({
      next: data => {
        this.orders = data;
        this.ordersLoading = false;
      },
      error: () => {
        this.ordersError = 'Could not load orders.';
        this.ordersLoading = false;
      }
    });
  }

  toggleExtraUserInfo(): void {
    this.extraUserInfoVisible = !this.extraUserInfoVisible;
    if (this.extraUserInfoVisible && !this.extraUserInfo) {
      this.loadExtraUserInfo();
    }
  }

  loadExtraUserInfo(): void {
    if (!this.useremail || !this.token) {
      this.extraUserInfoError = 'User email or token not available.';
      return;
    }

    this.extraUserInfoLoading = true;
    this.extraUserInfoError = '';
    this.extraUserInfo = null;
    this.extraUserInfoUpdateError = '';
    this.extraUserInfoUpdateSuccess = false;

    const encodedEmail = encodeURIComponent(this.useremail);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<User>(`https://localhost:7132/api/User/by-email/${encodedEmail}`, { headers }).subscribe({
      next: data => {
        this.extraUserInfo = data;
        this.extraUserInfoLoading = false;
      },
      error: () => {
        this.extraUserInfoError = 'Failed to load extra user info.';
        this.extraUserInfoLoading = false;
      }
    });
  }

  updateExtraUserInfo(): void {
    if (!this.extraUserInfo || !this.extraUserInfo.UserID || !this.token) {
      this.extraUserInfoUpdateError = 'Missing user info or token.';
      return;
    }

    this.extraUserInfoUpdating = true;
    this.extraUserInfoUpdateError = '';
    this.extraUserInfoUpdateSuccess = false;

    const updatePayload = {
      Name: this.extraUserInfo.Name,
      ContactNumber: this.extraUserInfo.ContactNumber
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });

    this.http.put<User>(
      `https://localhost:7132/api/User/${this.extraUserInfo.UserID}`,
      updatePayload,
      { headers }
    ).subscribe({
      next: data => {
        this.extraUserInfo = data;
        this.extraUserInfoUpdating = false;
        this.extraUserInfoUpdateSuccess = true;
        setTimeout(() => this.extraUserInfoUpdateSuccess = false, 2000);
      },
      error: () => {
        this.extraUserInfoUpdateError = 'Failed to update extra user info.';
        this.extraUserInfoUpdating = false;
      }
    });
  }
}
