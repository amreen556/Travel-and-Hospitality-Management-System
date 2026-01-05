import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Package } from '../models/package.model';
import { AddPackage } from '../models/add-package.model';
import { EditPackage } from '../models/edit-package.model';
import { PackageImageDto } from '../models/packageImageDto.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private apiUrl = 'https://localhost:7132/api/Package';

  constructor(private http: HttpClient) {}

  // 🔍 Get all packages
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl);
  }

  // 🔍 Get a package by ID
  getPackage(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`);
  }

  // ➕ Add a new package
  addPackage(pkg: AddPackage): Observable<Package> {
    return this.http.post<Package>(this.apiUrl, pkg);
  }

  // ✏️ Update an existing package
  updatePackage(id: string, pkg: EditPackage): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/${id}`, pkg);
  }

  // ❌ Delete a package
  deletePackage(id: string): Observable<Package> {
    return this.http.delete<Package>(`${this.apiUrl}/${id}`);
  }

  // 📤 Upload a package image
  uploadPackageImage(formData: FormData): Observable<PackageImageDto> {
    const packageId = formData.get('packageID');
    return this.http.post<PackageImageDto>(
      `${this.apiUrl}/${packageId}/upload-image`,
      formData
    );
  }

  // 📥 Get all images for a package
  getPackageImages(packageId: string): Observable<PackageImageDto[]> {
    return this.http.get<PackageImageDto[]>(
      `${this.apiUrl}/${packageId}/images`
    );
  }
}
