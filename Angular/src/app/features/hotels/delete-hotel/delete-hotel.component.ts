import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-delete-hotel',
  templateUrl: './delete-hotel.component.html',
  styleUrls: ['./delete-hotel.component.css']
})
export class DeleteHotelComponent implements OnInit {
  hotelId: string = '';

  constructor(private hotelService: HotelService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id') || '';
    this.hotelService.deleteHotel(this.hotelId).subscribe(() => {
      this.router.navigate(['/hotels']);
    });
  }
}
