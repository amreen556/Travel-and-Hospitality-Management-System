import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookingComponent } from './delete-booking.component';

describe('DeleteBookingComponent', () => {
  let component: DeleteBookingComponent;
  let fixture: ComponentFixture<DeleteBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBookingComponent]
    });
    fixture = TestBed.createComponent(DeleteBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
