import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { RidesComponent } from './components/rides/rides.component';
import { ShowsComponent } from './components/shows/shows.component';
import { DiningComponent } from './components/dining/dining.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { BookingComponent } from './components/booking/booking.component';
import { OrderconfirmationComponent } from './components/orderconfirmation/orderconfirmation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/adminlogin.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RidesComponent,
    ShowsComponent,
    DiningComponent,
    ShoppingComponent,
    BookingComponent,
    OrderconfirmationComponent,
    AdminComponent,
    AdminLoginComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
