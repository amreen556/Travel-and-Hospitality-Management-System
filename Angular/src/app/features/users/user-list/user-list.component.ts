import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(id: string) {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string) {
    this.router.navigate(['/users/delete', id]);
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }
}
