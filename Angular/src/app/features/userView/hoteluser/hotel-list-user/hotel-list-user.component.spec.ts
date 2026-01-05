import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelListUserComponent } from './hotel-list-user.component';

describe('HotelListUserComponent', () => {
  let component: HotelListUserComponent;
  let fixture: ComponentFixture<HotelListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelListUserComponent]
    });
    fixture = TestBed.createComponent(HotelListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
