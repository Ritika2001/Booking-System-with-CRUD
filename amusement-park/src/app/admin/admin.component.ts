import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Admin } from '../_models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  viewMode = 'tab1';
  formshowEdit!: FormGroup;
  showsTypesDB: any[] = [];
  showsAdminDB: any[] = [];
  admin: Admin = new Admin;


  constructor(private http: HttpClient, private accountService: AccountService,) {
    this.accountService.admin.subscribe(x => this.admin = x);
    console.log(this.admin);

    this.formshowEdit = new FormGroup({
      show_name: new FormControl(''),
      show_desc: new FormControl(''),
      start_time: new FormControl(''),
      end_time: new FormControl(''),
      wc_accesible: new FormControl(''),
      show_price: new FormControl(''),
      show_type_id: new FormControl('')
    });

    this.http.get<any>('http://127.0.0.1:5000/getShowTypes').subscribe(
      response => {
        this.showsTypesDB = response;
      },
      error => {
        console.log(error);
      }
    );

    this.http.get<any>('http://127.0.0.1:5000/getShowsAdmin').subscribe(
      response => {
        this.showsAdminDB = response;
      },
      error => {
        console.log(error);
      }
    );
  }
  insertShow() {
    this.http.post('http://127.0.0.1:5000/insert_show', this.formshowEdit.value).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );

  }
  removeShowAdmin(i: number) {
    this.http.get<any>('http://127.0.0.1:5000/deleteShow?id=' + i).subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
}
