import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { AddHotel } from '../models/add-hotel.model';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent {
  hotelForm: FormGroup; 
  imageFile: File | null = null;
  imageUrl: string = '';

  
  constructor(private fb: FormBuilder, private hotelService: HotelService, private router: Router) {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      roomsAvailable: [0, Validators.required],
      rating: [0, Validators.required],
      pricePerNight: [0, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0]; 
  }

  onSubmit() {
    if (this.hotelForm.valid) {
      const newHotel: AddHotel = this.hotelForm.value;

      this.hotelService.addHotel(newHotel).subscribe(hotel => {
        if (this.imageFile) {  
          const formData = new FormData();
          formData.append('file', this.imageFile);
          formData.append('hotelID', hotel.hotelID);
          formData.append('title', 'Hotel Image');

          this.hotelService.uploadHotelImage(formData).subscribe(() => {
            this.router.navigate(['/hotels']);
          });
        } 
        else {
          this.router.navigate(['/hotels']);
        }
      });
    }
  }
}
