import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../services/package.service';

@Component({
  selector: 'app-delete-package',
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css']
})
export class DeletePackageComponent implements OnInit {
  packageId: string = '';

  constructor(
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('id') || '';
    this.packageService.deletePackage(this.packageId).subscribe(() => {
      this.router.navigate(['/packages']);
    });
  }
}
