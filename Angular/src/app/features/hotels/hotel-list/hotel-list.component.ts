import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel.model';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(private hotelService: HotelService, private router: Router) {}

  ngOnInit(): void {
    this.loadHotels();
  }

 loadHotels() {
  this.hotelService.getHotels().subscribe(data => {
    this.hotels = data;
    this.hotels.forEach(hotel => {
      this.hotelService.getHotelImages(hotel.hotelID).subscribe(images => {
        if (images.length > 0) {
          hotel.imageUrl = images[0].url;
        }
      });
    });
  });
}


  editHotel(id: string) {
    this.router.navigate(['/hotels/edit', id]);
  }

  deleteHotel(id: string) {
    this.router.navigate(['/hotels/delete', id]);
  }

  addHotel() {
    this.router.navigate(['/hotels/add']);
  }
}

