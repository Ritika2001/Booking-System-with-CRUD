import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent {
  constructor(private router: Router) { }

  goToBooking() {
    this.router.navigate(['/booking']);
  }

  goToRegion1() {
    this.router.navigate(['/rides'], { fragment: 'area1' });
  }

  goToRegion2() {
    this.router.navigate(['/rides'], { fragment: 'area2' });
  }

  goToRegion3() {
    this.router.navigate(['/rides'], { fragment: 'area3' });
  }

  goToRegion4() {
    this.router.navigate(['/rides'], { fragment: 'area4' });
  }

}
