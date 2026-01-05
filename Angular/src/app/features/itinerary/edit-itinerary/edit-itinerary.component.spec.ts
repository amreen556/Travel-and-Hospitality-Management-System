import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItineraryComponent } from './edit-itinerary.component';

describe('EditItineraryComponent', () => {
  let component: EditItineraryComponent;
  let fixture: ComponentFixture<EditItineraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditItineraryComponent]
    });
    fixture = TestBed.createComponent(EditItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
