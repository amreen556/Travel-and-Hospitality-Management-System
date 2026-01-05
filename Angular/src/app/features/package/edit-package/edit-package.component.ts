import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from '../services/package.service';
import { EditPackage } from '../models/edit-package.model';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.css']
})
export class EditPackageComponent implements OnInit {
  packageForm: FormGroup;
  packageId: string = '';

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.packageForm = this.fb.group({
      name: ['', Validators.required],
      includedHotels: ['', Validators.required],
      includedFlights: ['', Validators.required],
      activities: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('id') || '';
    this.packageService.getPackage(this.packageId).subscribe(packageData => {
      this.packageForm.patchValue(packageData);
    });
  }

  onSubmit(): void {
    if (this.packageForm.valid) {
      const updatedPackage: EditPackage = {
        packageID: this.packageId,
        ...this.packageForm.value
      };
      this.packageService.updatePackage(this.packageId, updatedPackage).subscribe(() => {
        this.router.navigate(['/packages']);
      });
    }
  }
}
