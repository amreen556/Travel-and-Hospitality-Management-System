import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AdminComponent } from './features/admin/admin.component';

import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { AddHotelComponent } from './features/hotels/add-hotel/add-hotel.component';
import { EditHotelComponent } from './features/hotels/edit-hotel/edit-hotel.component';
import { DeleteHotelComponent } from './features/hotels/delete-hotel/delete-hotel.component';

import { FlightListComponent } from './features/flights/flight-list/flight-list.component';
import { AddFlightComponent } from './features/flights/add-flight/add-flight.component';  
import { EditFlightComponent } from './features/flights/edit-flight/edit-flight.component';
import { DeleteFlightComponent } from './features/flights/delete-flight/delete-flight.component';   

import { PackageListComponent } from './features/package/package-list/package-list.component';
import { AddPackageComponent } from './features/package/add-package/add-package.component';  
import { EditPackageComponent } from './features/package/edit-package/edit-package.component'; 
import { DeletePackageComponent } from './features/package/delete-package/delete-package.component';  

import { InvoiceListComponent } from './features/invoice/invoice-list/invoice-list.component';
import { AddInvoiceComponent } from './features/invoice/add-invoice/add-invoice.component';  
import { EditInvoiceComponent } from './features/invoice/edit-invoice/edit-invoice.component'; 
import { DeleteInvoiceComponent } from './features/invoice/delete-invoice/delete-invoice.component'; 

import { ItineraryListComponent } from './features/itinerary/itinerary-list/itinerary-list.component';
import { AddItineraryComponent } from './features/itinerary/add-itinerary/add-itinerary.component';
import { EditItineraryComponent } from './features/itinerary/edit-itinerary/edit-itinerary.component';
import { DeleteItineraryComponent } from './features/itinerary/delete-itinerary/delete-itinerary.component';

import { ReviewListComponent } from './features/review/review-list/review-list.component';
import { DeleteReviewComponent } from './features/review/delete-review/delete-review.component';
import { UserReviewComponent } from './features/review/user-review/user-review.component'; // ✅ NEW

import { SupportTicketComponent } from './features/support-ticket/support-ticket.component';

import { AddBookingComponent } from './features/bookings/add-booking/add-booking.component';
import { BookingListComponent } from './features/bookings/booking-list/booking-list.component';
import { DeleteBookingComponent } from './features/bookings/delete-booking/delete-booking.component';
import { EditBookingComponent } from './features/bookings/edit-booking/edit-booking.component';

import { UserListComponent } from './features/users/user-list/user-list.component';
import { AddUserComponent } from './features/users/add-user/add-user.component';
import { EditUserComponent } from './features/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './features/users/delete-user/delete-user.component';

import { HotelListUserComponent } from './features/userView/hoteluser/hotel-list-user/hotel-list-user.component';
import { FlightListUserComponent } from './features/userView/flightuser/flight-list-user/flight-list-user.component';
import { PackageListUserComponent } from './features/userView/packageuser/package-list-user/package-list-user.component';
import { CartComponent } from './features/cart/cart.component';
import { PaymentComponent } from './features/payment/payment.component';
import { OrderComponent } from './features/order/order.component';

import { UserextrainfoComponent } from './features/userextrainfo/userextrainfo.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { AllOrdersComponent } from './features/all-orders/all-orders.component';

import { AdvancedUserManagementComponent } from './features/advanced-user-management/advanced-user-management.component';
import { authGuard } from './features/auth/guards/auth.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },

  { path: 'hoteluser', component: HotelListUserComponent,canActivate: [authGuard] },
  { path: 'hoteluser', component: HotelListUserComponent,canActivate: [authGuard] },
  { path: 'hoteluser', component: HotelListUserComponent,canActivate: [authGuard] },
  { path: 'flightuser', component: FlightListUserComponent ,canActivate: [authGuard]},
  { path: 'packageuser', component: PackageListUserComponent ,canActivate: [authGuard]},
  { path: 'cart', component: CartComponent ,canActivate: [authGuard]},
  { path: 'payment', component: PaymentComponent ,canActivate: [authGuard]},
  { path: 'orders', component: OrderComponent ,canActivate: [authGuard]},

  { path: 'hotels', component: HotelListComponent ,canActivate: [authGuard]},
  { path: 'hotels/add', component: AddHotelComponent ,canActivate: [authGuard]},
  { path: 'hotels/edit/:id', component: EditHotelComponent,canActivate: [authGuard] },
  { path: 'hotels/delete/:id', component: DeleteHotelComponent ,canActivate: [authGuard]},

  { path: 'flights', component: FlightListComponent,canActivate: [authGuard] },
  { path: 'flights/add', component: AddFlightComponent ,canActivate: [authGuard]},
  { path: 'flights/edit/:id', component: EditFlightComponent,canActivate: [authGuard] },
  { path: 'flights/delete/:id', component: DeleteFlightComponent ,canActivate: [authGuard]},

  { path: 'packages', component: PackageListComponent ,canActivate: [authGuard]},
  { path: 'packages/add', component: AddPackageComponent ,canActivate: [authGuard]},
  { path: 'packages/edit/:id', component: EditPackageComponent,canActivate: [authGuard] },
  { path: 'packages/delete/:id', component: DeletePackageComponent,canActivate: [authGuard] },

  { path: 'invoices', component: InvoiceListComponent ,canActivate: [authGuard]},
  { path: 'invoices/add', component: AddInvoiceComponent,canActivate: [authGuard] },
  { path: 'invoices/edit/:id', component: EditInvoiceComponent,canActivate: [authGuard] },
  { path: 'invoices/delete/:id', component: DeleteInvoiceComponent ,canActivate: [authGuard]},

  { path: 'itineraries', component: ItineraryListComponent,canActivate: [authGuard] },
  { path: 'itineraries/add', component: AddItineraryComponent ,canActivate: [authGuard]},
  { path: 'itineraries/edit/:id', component: EditItineraryComponent,canActivate: [authGuard] },
  { path: 'itineraries/delete/:id', component: DeleteItineraryComponent,canActivate: [authGuard] },

  { path: 'review', component: ReviewListComponent ,canActivate: [authGuard]},
  { path: 'reviews/delete/:id', component: DeleteReviewComponent ,canActivate: [authGuard]},
  { path: 'user-review', component: UserReviewComponent ,canActivate: [authGuard]}, // ✅ NEW

  { path: 'support-ticket', component: SupportTicketComponent ,canActivate: [authGuard]},

  { path: 'bookings', component: BookingListComponent,canActivate: [authGuard] },
  { path: 'bookings/add', component: AddBookingComponent ,canActivate: [authGuard]},
  { path: 'bookings/edit/:id', component: EditBookingComponent,canActivate: [authGuard] },
  { path: 'bookings/delete/:id', component: DeleteBookingComponent ,canActivate: [authGuard]},

  { path: 'users', component: UserListComponent,canActivate: [authGuard] },
  { path: 'users/add', component: AddUserComponent ,canActivate: [authGuard]},
  { path: 'users/edit/:id', component: EditUserComponent,canActivate: [authGuard] },
  { path: 'users/delete/:id', component: DeleteUserComponent,canActivate: [authGuard] },

    { path: 'userextrainfo', component: UserextrainfoComponent,canActivate: [authGuard] },
  {  path: 'profile', component: UserProfileComponent ,canActivate: [authGuard] },
   { path: 'allorders', component: AllOrdersComponent ,canActivate: [authGuard]},
     { path: 'advanced-user-management', component: AdvancedUserManagementComponent,canActivate: [authGuard] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
