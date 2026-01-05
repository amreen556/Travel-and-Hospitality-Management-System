import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddHotel } from '../models/add-hotel.model';
import { EditHotel } from '../models/edit-hotel.model';
import { Hotel } from '../models/hotel.model';
import { HotelImageDto } from '../models/hotelImageDto.model';

// import { Hotel, AddHotel, EditHotel, HotelImageDto } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'https://localhost:7132/api/Hotel';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotel(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  addHotel(hotel: AddHotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  updateHotel(id: string, hotel: EditHotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/${id}`, hotel);
  }

  deleteHotel(id: string): Observable<Hotel> {
    return this.http.delete<Hotel>(`${this.apiUrl}/${id}`);
  }

  uploadHotelImage(formData: FormData): Observable<HotelImageDto> {
    const hotelId = formData.get('hotelID');
    return this.http.post<HotelImageDto>(`${this.apiUrl}/${hotelId}/upload-image`, formData);
  }

  getHotelImages(hotelId: string): Observable<HotelImageDto[]> {
    return this.http.get<HotelImageDto[]>(`${this.apiUrl}/${hotelId}/images`);
  }
}
