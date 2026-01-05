import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddUser } from '../models/add-user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      contactNumber: ['', Validators.required]

    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: AddUser = this.userForm.value;
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.router.navigate(['/users']); // Redirect to user list
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }
}
