import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PackageService } from '../services/package.service';
import { AddPackage } from '../models/add-package.model';
import { PackageImageDto } from '../models/packageImageDto.model';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent {
  packageForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private router: Router
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      includedHotels: ['', Validators.required],
      includedFlights: ['', Validators.required],
      activities: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files?.[0] ?? null;
  }

  onSubmit(): void {
    if (!this.packageForm.valid) {
      return;
    }

    const newPkg: AddPackage = this.packageForm.value;
    this.packageService.addPackage(newPkg).subscribe(pkg => {
      if (this.imageFile) {
        const formData = new FormData();
        formData.append('file', this.imageFile);
        formData.append('packageID', pkg.packageID);
        formData.append('title', 'Package Image');

        this.packageService.uploadPackageImage(formData).subscribe({
          next: () => this.router.navigate(['/packages']),
          error: () => this.router.navigate(['/packages'])
        });
      } else {
        this.router.navigate(['/packages']);
      }
    }, err => {
      console.error('Error adding package:', err);
    });
  }
}
