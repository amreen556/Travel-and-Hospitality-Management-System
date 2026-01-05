import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItineraryComponent } from './delete-itinerary.component';

describe('DeleteItineraryComponent', () => {
  let component: DeleteItineraryComponent;
  let fixture: ComponentFixture<DeleteItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteItineraryComponent]
    });
    fixture = TestBed.createComponent(DeleteItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
