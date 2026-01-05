import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { AddInvoice } from '../models/add-invoice.model';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent {
  invoiceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      bookingID: ['', Validators.required],
      userID: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const newInvoice: AddInvoice = this.invoiceForm.value;
      this.invoiceService.addInvoice(newInvoice).subscribe(() => {
        this.router.navigate(['/invoices']);
      });
    }
  }
}
