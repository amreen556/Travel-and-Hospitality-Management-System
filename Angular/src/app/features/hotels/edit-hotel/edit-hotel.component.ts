import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { EditHotel } from '../models/edit-hotel.model';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css']
})
export class EditHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotelId: string = '';

  constructor(private fb: FormBuilder, private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      roomsAvailable: [0, Validators.required],
      rating: [0, Validators.required],
      pricePerNight: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id') || '';
    this.hotelService.getHotel(this.hotelId).subscribe(hotel => {
      this.hotelForm.patchValue(hotel);
    });
  }

  onSubmit() {
    if (this.hotelForm.valid) {
      const updatedHotel: EditHotel = {
        hotelID: this.hotelId,
        ...this.hotelForm.value
      };
      this.hotelService.updateHotel(this.hotelId, updatedHotel).subscribe(() => {
        this.router.navigate(['/hotels']);
      });
    }
  }
}
