import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageListUserComponent } from './package-list-user.component';

describe('PackageListUserComponent', () => {
  let component: PackageListUserComponent;
  let fixture: ComponentFixture<PackageListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageListUserComponent]
    });
    fixture = TestBed.createComponent(PackageListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
