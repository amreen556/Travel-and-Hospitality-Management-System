import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './features/auth/login/login.component';

import { AddHotelComponent } from './features/hotels/add-hotel/add-hotel.component';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { EditHotelComponent } from './features/hotels/edit-hotel/edit-hotel.component';
import { DeleteHotelComponent } from './features/hotels/delete-hotel/delete-hotel.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdminComponent } from './features/admin/admin.component';
import { AddFlightComponent } from './features/flights/add-flight/add-flight.component';
import { DeleteFlightComponent } from './features/flights/delete-flight/delete-flight.component';
import { EditFlightComponent } from './features/flights/edit-flight/edit-flight.component';
import { FlightListComponent } from './features/flights/flight-list/flight-list.component';
// Update the path below to match the actual location and filename of PackageComponent
import { AddPackageComponent } from './features/package/add-package/add-package.component';
import { DeletePackageComponent } from './features/package/delete-package/delete-package.component';
import { EditPackageComponent } from './features/package/edit-package/edit-package.component';
import { PackageListComponent } from './features/package/package-list/package-list.component';
import { AddInvoiceComponent } from './features/invoice/add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './features/invoice/edit-invoice/edit-invoice.component';
import { DeleteInvoiceComponent } from './features/invoice/delete-invoice/delete-invoice.component';
import { InvoiceListComponent } from './features/invoice/invoice-list/invoice-list.component';
//import { ItineraryListComponent } from './itinerary-list/itinerary-list.component';
//import { ItineraryFormComponent } from './itinerary-form/itinerary-form.component';
//import { ItineraryDetailsComponent } from './itinerary-details/itinerary-details.component';
//import { AddItineraryComponent } from './features/itinerary/add-itinerary/add-itinerary.component';
//import { DeleteItineraryComponent } from './features/itinerary/delete-itinerary/delete-itinerary.component';
//import { EditItineraryComponent } from './features/itinerary/edit-itinerary/edit-itinerary.component';
//import { ServicesComponent } from './features/itinerary/services/services.component';

import { ItineraryListComponent } from './features/itinerary/itinerary-list/itinerary-list.component';
import { AddItineraryComponent } from './features/itinerary/add-itinerary/add-itinerary.component';
import { EditItineraryComponent } from './features/itinerary/edit-itinerary/edit-itinerary.component';
import { DeleteItineraryComponent } from './features/itinerary/delete-itinerary/delete-itinerary.component';


import { ReviewListComponent } from './features/review/review-list/review-list.component';
import { DeleteReviewComponent } from './features/review/delete-review/delete-review.component';
import { SupportTicketComponent } from './features/support-ticket/support-ticket.component';

import { AddBookingComponent } from './features/bookings/add-booking/add-booking.component';
import { EditBookingComponent } from './features/bookings/edit-booking/edit-booking.component';
import { DeleteBookingComponent } from './features/bookings/delete-booking/delete-booking.component';
import { BookingListComponent } from './features/bookings/booking-list/booking-list.component';
import { AddUserComponent } from './features/users/add-user/add-user.component';
import { EditUserComponent } from './features/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './features/users/delete-user/delete-user.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
// import { HoteluserComponent } from './features/userView/hoteluser/hoteluser.component';
//import { PackageuserComponent } from './features/userView/packageuser/packageuser.component';


import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelListUserComponent } from './features/userView/hoteluser/hotel-list-user/hotel-list-user.component';
import { CartComponent } from './features/cart/cart.component';
import { PaymentComponent } from './features/payment/payment.component';
import { OrderComponent } from './features/order/order.component';
import { FlightListUserComponent } from './features/userView/flightuser/flight-list-user/flight-list-user.component';
import { PackageListUserComponent } from './features/userView/packageuser/package-list-user/package-list-user.component';
import { UserReviewComponent } from './features/review/user-review/user-review.component';
//import { FlightUserReviewComponent } from './features/review/flight-user-review/flight-user-review.component';

import { UserextrainfoComponent } from './features/userextrainfo/userextrainfo.component';
import { UserProfileComponent } from "./features/user-profile/user-profile.component";
import { AllOrdersComponent } from './features/all-orders/all-orders.component';

import { AdvancedUserManagementComponent } from './features/advanced-user-management/advanced-user-management.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    AddHotelComponent,
    HotelListComponent,
    EditHotelComponent,
    DeleteHotelComponent,
    RegisterComponent,
    AdminComponent,
    AddFlightComponent,
    DeleteFlightComponent,
    EditFlightComponent,
    FlightListComponent,
    AddPackageComponent,
    DeletePackageComponent,
    EditPackageComponent,
    PackageListComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    DeleteInvoiceComponent,
    InvoiceListComponent,
    ItineraryListComponent,
    //ItineraryFormComponent,
    //ItineraryDetailsComponent,
    AddItineraryComponent,
    DeleteItineraryComponent,
    EditItineraryComponent,
   
    ReviewListComponent,
    DeleteReviewComponent,
    SupportTicketComponent,
    AddBookingComponent,
    EditBookingComponent,
    DeleteBookingComponent,
    BookingListComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserListComponent,
    UserextrainfoComponent,
    UserProfileComponent,
    AllOrdersComponent,
    //PackageuserComponent,
    HotelListUserComponent,
    CartComponent,
    PaymentComponent,
    OrderComponent,
    FlightListUserComponent,
    PackageListUserComponent,
       AdvancedUserManagementComponent,
    UserReviewComponent,
    
    //FlightUserReviewComponent,
    //ServicesComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,


  MatMenuModule,
  MatButtonModule,
  BrowserAnimationsModule,
],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
