import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PackageService } from '../services/package.service';
import { Package } from '../models/package.model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];

  constructor(
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
      this.packages.forEach(pkg => {
        this.packageService.getPackageImages(pkg.packageID).subscribe(images => {
          if (images.length > 0) {
            pkg.imageUrl = images[0].url;
          }
        });
      });
    });
  }

  editPackage(id: string): void {
    this.router.navigate(['/packages/edit', id]);
  }

  deletePackage(id: string): void {
    this.router.navigate(['/packages/delete', id]);
  }

  addPackage(): void {
    this.router.navigate(['/packages/add']);
  }
}
