import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListUserComponent } from './flight-list-user.component';

describe('FlightListUserComponent', () => {
  let component: FlightListUserComponent;
  let fixture: ComponentFixture<FlightListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightListUserComponent]
    });
    fixture = TestBed.createComponent(FlightListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
