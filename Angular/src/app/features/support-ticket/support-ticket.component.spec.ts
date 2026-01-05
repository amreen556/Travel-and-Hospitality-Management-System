import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SupportTicketComponent } from './support-ticket.component';
import { SupportTicketService } from './services/support-ticket.service';

describe('SupportTicketComponent', () => {
  let component: SupportTicketComponent;
  let fixture: ComponentFixture<SupportTicketComponent>;
  let supportTicketServiceSpy: jasmine.SpyObj<SupportTicketService>;

  beforeEach(() => {
    supportTicketServiceSpy = jasmine.createSpyObj('SupportTicketService', ['getAllTickets', 'updateTicket']);
    supportTicketServiceSpy.getAllTickets.and.returnValue(of([])); // Return an empty array for initial load

    TestBed.configureTestingModule({
      declarations: [SupportTicketComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SupportTicketService, useValue: supportTicketServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(SupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});