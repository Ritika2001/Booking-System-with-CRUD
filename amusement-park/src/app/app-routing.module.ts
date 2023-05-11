import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { RidesComponent } from '../app/components/rides/rides.component';
import { ShowsComponent } from './components/shows/shows.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { DiningComponent } from './components/dining/dining.component';
import { AuthGuard } from './_helpers';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { OrderconfirmationComponent } from './components/orderconfirmation/orderconfirmation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/adminlogin.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'rides', component: RidesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'dining', component: DiningComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'orderconfirmation', component: OrderconfirmationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
