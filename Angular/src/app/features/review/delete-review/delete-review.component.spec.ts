import { ComponentFixture, TestBed } from '@angular/core/testing';

// Ensure the file exists at the correct path, or update the import path if necessary
import { DeleteReviewComponent } from './delete-review.component';

describe('DeleteReviewComponent', () => {
  let component: DeleteReviewComponent;
  let fixture: ComponentFixture<DeleteReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReviewComponent]
    });
    fixture = TestBed.createComponent(DeleteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
