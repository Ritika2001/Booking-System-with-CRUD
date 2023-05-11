import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'
import { AccountService } from './_services';
import { User } from './_models';
import { Admin } from './_models';

import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'amusement-park';
  user: User = new User;
  admin: Admin = new Admin;
  showHead: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
    console.log(this.user);

    this.accountService.admin.subscribe(x => this.admin = x);
    console.log(this.admin);

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/admin') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }



  logout() {
    this.accountService.logout();
    window.location.reload();
  }
  adminlogout() {
    this.accountService.adminlogout();
    window.location.reload();
  }




  goToBooking() {
    this.router.navigate(['/booking']);
  }
}




