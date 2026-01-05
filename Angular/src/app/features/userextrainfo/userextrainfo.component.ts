import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  UserID?: string;
  Name: string;
  Email: string;
  Password: string;
  Role: string;
  ContactNumber: string;
}

@Component({
  selector: 'app-userextrainfo',
  templateUrl: './userextrainfo.component.html'
})
export class UserextrainfoComponent implements OnInit {
  infos: User[] = [];
  selectedInfo: User | null = null;
  isEditing = false;
  loading = false;
  error = '';

  private apiUrl = 'https://localhost:7132/api/UserExtraInfo';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadInfos();
  }

  loadInfos() {
    this.loading = true;
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: data => {
        this.infos = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load data.';
        this.loading = false;
      }
    });
  }

  selectInfo(info: User) {
    this.selectedInfo = { ...info };
    this.isEditing = true;
  }

  newInfo() {
    this.selectedInfo = {
      Name: '',
      Email: '',
      Password: '',
      Role: '',
      ContactNumber: ''
    };
    this.isEditing = false;
  }

  saveInfo() {
    if (!this.selectedInfo) return;
    this.loading = true;

    if (this.selectedInfo.UserID) {
      // Update
      this.http.put<User>(`${this.apiUrl}/${this.selectedInfo.UserID}`, this.selectedInfo).subscribe({
        next: () => {
          this.loadInfos();
          this.selectedInfo = null;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to update.';
          this.loading = false;
        }
      });
    } else {
      // Create
      this.http.post<User>(this.apiUrl, this.selectedInfo).subscribe({
        next: () => {
          this.loadInfos();
          this.selectedInfo = null;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to create.';
          this.loading = false;
        }
      });
    }
  }

  deleteInfo(id: string) {
    if (!confirm('Delete this user?')) return;
    this.loading = true;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.loadInfos();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to delete.';
        this.loading = false;
      }
    });
  }

  cancel() {
    this.selectedInfo = null;
    this.error = '';
  }
}
