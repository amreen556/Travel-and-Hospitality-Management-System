import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token: string | null = null;
  roles: string[] = [];

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.token = parsed.token;

      if (this.token) {
        try {
          const decoded: any = jwtDecode(this.token);
          const roleClaim = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
        } catch {
          console.error('Failed to decode token.');
        }
      }
    }
  }

  isAdmin(): boolean {
  return Array.isArray(this.roles) && this.roles.includes('Admin');
}
 
}
