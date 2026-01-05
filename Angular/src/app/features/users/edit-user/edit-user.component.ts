import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { EditUser } from '../models/edit-user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        password: '', // Ask user to re-enter or set a default
        role: user.role,
        contactNumber: user.contactNumber
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: EditUser = this.userForm.value;
      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }
}
