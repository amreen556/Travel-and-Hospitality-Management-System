import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { UpdateInvoice } from '../models/update-invoice.model';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceID: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      bookingID: ['', Validators.required],
      userID: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.invoiceID = this.route.snapshot.paramMap.get('id') || '';
    this.invoiceService.getInvoice(this.invoiceID).subscribe((invoice: Invoice) => {
      this.invoiceForm.patchValue({
        bookingID: invoice.bookingID,
        userID: invoice.userID,
        totalAmount: invoice.totalAmount
      });
    });
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const updatedInvoice: UpdateInvoice = this.invoiceForm.value;
      this.invoiceService.updateInvoice(this.invoiceID, updatedInvoice).subscribe(() => {
        this.router.navigate(['/invoices']);
      });
    }
  }
}
