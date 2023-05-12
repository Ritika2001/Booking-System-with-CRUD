import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-orderconfirmation',
  templateUrl: './orderconfirmation.component.html',
  styleUrls: ['./orderconfirmation.component.css']
})
export class OrderconfirmationComponent {
  user: User = new User;
  orderDetails: any;
  date

  constructor(private accountService: AccountService, private router: Router, private http: HttpClient,
    public datepipe: DatePipe) {
    this.accountService.user.subscribe(x => this.user = x);

    this.date = this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    this.http.get<any>('http://127.0.0.1:5000/fetchOrderDetails?user_id=' + this.user.user_id).subscribe(
      response => {
        this.orderDetails = response;
        console.log(this.orderDetails);

      },
      error => {
        console.log(error);
      }
    );
  }
}
