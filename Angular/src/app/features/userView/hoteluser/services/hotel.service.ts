import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddHotel } from '../models/add-hotel.model';
import { EditHotel } from '../models/edit-hotel.model';
import { Hotel } from '../models/hotel.model';
import { HotelImageDto } from '../models/hotelImageDto.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'https://localhost:7132/api/Hotel';

  constructor(private http: HttpClient) {}

  // ✅ Get all hotels
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  // ✅ Get single hotel by ID
  getHotel(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  // ✅ Add new hotel
  addHotel(hotel: AddHotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  // ✅ Update existing hotel
  updateHotel(id: string, hotel: EditHotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, hotel);
  }

  // ✅ Delete hotel
  deleteHotel(id: string): Observable<Hotel> {
    return this.http.delete<Hotel>(`${this.apiUrl}/${id}`);
  }

  // ✅ Upload hotel image
  uploadHotelImage(formData: FormData): Observable<HotelImageDto> {
    const hotelId = formData.get('hotelID');
    return this.http.post<HotelImageDto>(`${this.apiUrl}/${hotelId}/upload-image`, formData);
  }

  // ✅ Get hotel images
  getHotelImages(hotelId: string): Observable<HotelImageDto[]> {
    return this.http.get<HotelImageDto[]>(`${this.apiUrl}/${hotelId}/images`);
  }
}
