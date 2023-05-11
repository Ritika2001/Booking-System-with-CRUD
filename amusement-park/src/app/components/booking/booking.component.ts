import { Component } from '@angular/core';
import { Tickets } from 'src/app/_models/tickets';
import { OnInit, VERSION } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
// import { ngNumberPicker } from 'angular-number-picker';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  user: User = new User;
  formVisitor!: FormGroup;
  formParking!: FormGroup;
  formShow!: FormGroup;
  formStore!: FormGroup;
  formCard!: FormGroup;

  basePrice = 200;
  parkingFixedPrice = 8;
  showFixedPrice = 20;

  visitorPriceDB: any[] = [];

  storesDB: any[] = [];
  storeItemsDB: any[] = [];
  storeItemsPriceDB: any[] = [];
  storeItemsQuantity: any[] = [];

  showsDB: any[] = [];
  showStartTimeDB: any[] = [];
  showEndTimeDB: any[] = [];
  showWCDB: any[] = [];
  showQuantityDB: any[] = [];
  showPriceDB: any[] = [];

  monthArray: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  yearArray: any[] = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  timeArray: any[] = [
    { value: 7.00, text: '07:00 AM' },
    { value: 7.50, text: '07:30 AM' },
    { value: 8.00, text: '08:00 AM' },
    { value: 8.50, text: '08:30 AM' },
    { value: 9.00, text: '09:00 AM' },
    { value: 9.50, text: '09:30 AM' },
    { value: 10.00, text: '10:00 AM' },
    { value: 10.50, text: '10:30 AM' },
    { value: 11.00, text: '11:00 AM' },
    { value: 11.50, text: '11:30 AM' },
    { value: 12.00, text: '12:00 PM' },
    { value: 12.50, text: '12:30 PM' },
    { value: 13.00, text: '01:00 PM' },
    { value: 13.50, text: '01:30 PM' },
    { value: 14.00, text: '02:00 PM' },
    { value: 14.50, text: '02:30 PM' },
    { value: 15.00, text: '03:00 PM' },
    { value: 15.50, text: '03:30 PM' },
    { value: 16.00, text: '04:00 PM' },
    { value: 16.50, text: '04:30 PM' },
    { value: 17.00, text: '05:00 PM' },
    { value: 17.50, text: '05:30 PM' },
    { value: 18.00, text: '06:00 PM' },
    { value: 18.50, text: '06:30 PM' },
    { value: 19.00, text: '07:00 PM' },
    { value: 19.50, text: '07:30 PM' },
    { value: 20.00, text: '08:00 PM' },
    { value: 20.50, text: '08:30 PM' },
    { value: 21.00, text: '09:00 PM' }
  ];
  endTimeArray: any[] = [];
  parkingPriceDB: any[] = [];

  onlineDiscount: number = 0.05;
  memberDiscount: number = 0.1;
  seniorChildDiscount: number = 0.15;

  totalPrice: number = 0.0;
  rawPrice: number = 0.0;
  totalDiscount: number = 0.0;
  taxes: number = 0.0;
  isFormActive: boolean = false;


  constructor(private accountService: AccountService, private http: HttpClient, private router: Router) {

    this.accountService.user.subscribe(x => this.user = x);
    console.log(this.user);

    this.formVisitor = new FormGroup({
      fName: new FormControl(''),
      lName: new FormControl(''),
      dob: new FormControl(''),
      member: new FormControl(''),
      price: new FormControl(''),
      user_id: new FormControl(this.user.user_id)
    });

  }

  ngOnInit() {

    this.http.get<any>('http://127.0.0.1:5000/getStores').subscribe(
      response => {
        this.storesDB = response;
      },
      error => {
        console.log(error);
      }
    );

    this.http.get<any>('http://127.0.0.1:5000/getShows').subscribe(
      response => {
        this.showsDB = response;
      },
      error => {
        console.log(error);
      }
    );

    this.formVisitor = new FormGroup({
      visitor: new FormArray([
        new FormGroup({
          fName: new FormControl(''),
          lName: new FormControl(''),
          dob: new FormControl(''),
          member: new FormControl(''),
          price: new FormControl(''),
          user_id: new FormControl(this.user.user_id)
        })
      ])
    });

    this.formParking = new FormGroup({
      parking: new FormArray([
        new FormGroup({
          inTime: new FormControl(''),
          outTime: new FormControl(''),
          parkingPrice: new FormControl('')
        })
      ])
    });

    this.formShow = new FormGroup({
      show: new FormArray([
        new FormGroup({
          shows: new FormControl(''),
          startTime: new FormControl(''),
          endTime: new FormControl(''),
          wc: new FormControl(''),
          showQuantity: new FormControl(''),
          showPrice: new FormControl('')
        })
      ])
    });

    this.formStore = new FormGroup({
      stores: new FormArray([
        new FormGroup({
          store: new FormControl(''),
          item: new FormControl(''),
          storeQuantity: new FormControl(''),
          storePrice: new FormControl('')
        })
      ])
    });

    this.formCard = new FormGroup({
      cardType: new FormControl('', [Validators.required]),
      nameOnCard: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(16)]),
      cardExpiryMonth: new FormControl('', [Validators.required]),
      cardExpiryYear: new FormControl('', [Validators.required]),
      cardCVV: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
    });

    this.formCard.disable();

  }

  activateForm() {
    this.formCard.enable();
    this.formVisitor.disable();
    this.formParking.disable();
    this.formShow.disable();
    this.formStore.disable();
  }

  deactivateForm() {
    this.formCard.disable();
    this.formVisitor.enable();
    this.formParking.enable();
    this.formShow.enable();
    this.formStore.enable();
  }


  onChangeStore(storeName: string): void {
    const selectedStore = storeName;
    this.http.get<any>('http://127.0.0.1:5000/getStoresItems?store=' + selectedStore).subscribe(
      response => {
        this.storeItemsDB.push(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  goToOrderConfirmation() {
    this.router.navigate(['/orderconfirmation']);
  }


  // VISITOR
  get visitor(): FormArray {
    return this.formVisitor.get('visitor') as FormArray;
  }

  onCompleteVisitor(i: number): void {
    const dob = new Date(this.formVisitor.value['visitor'][i]['dob']).getTime();
    const timeDiff = Math.abs(Date.now() - dob);
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    let discount = this.onlineDiscount;
    if (age <= 7 || age >= 60) {
      discount += this.seniorChildDiscount;
    }
    if (this.formVisitor.value['visitor'][i]['member'] == "yes") {
      discount += this.memberDiscount;
    }
    const visitorPrice = this.basePrice * (1 - discount);
    try {
      const temp = (typeof this.visitorPriceDB[i] === 'undefined') ? 0 : this.visitorPriceDB[i];;
      this.visitorPriceDB[i] = visitorPrice;
      this.totalPrice = this.totalPrice + visitorPrice - temp;
      this.rawPrice = this.rawPrice + this.basePrice - temp;
      this.totalDiscount = this.totalPrice - this.rawPrice;
    }
    catch (e) {
      this.visitorPriceDB.push(visitorPrice);
      this.totalPrice += visitorPrice;
      this.rawPrice += this.basePrice;
      this.totalDiscount = this.totalPrice - this.rawPrice;
    }
    this.formVisitor.value['visitor'][i]['price'] = visitorPrice;
    this.formVisitor.value['visitor'][i]['user_id'] = this.user.user_id;

  }

  removeVisitor() {
    this.totalPrice -= this.formVisitor.value['visitor'][this.visitor.length - 1]['price'];
    this.rawPrice -= this.basePrice;
    this.totalDiscount = this.totalPrice - this.rawPrice;
    this.visitor.removeAt(-1);
    this.visitorPriceDB.pop()
  }

  addVisitor() {
    this.visitor.push(
      new FormGroup({
        fName: new FormControl(''),
        lName: new FormControl(''),
        dob: new FormControl(''),
        member: new FormControl(''),
        price: new FormControl('')
      })
    );
  }




  //PARKING
  get parking(): FormArray {
    return this.formParking.get('parking') as FormArray;
  }

  addParking() {
    this.parking.push(
      new FormGroup({
        inTime: new FormControl(''),
        outTime: new FormControl(''),
        parkingPrice: new FormControl('')
      })
    );
  }

  updateEndTime(inTimeDB: number) {
    this.endTimeArray.push(this.timeArray.filter(time => time.value > inTimeDB));
  }

  updateParkingPrice(outTimeDB: number, i: number) {

    const duration = outTimeDB - this.formParking.value['parking'][i]['inTime'];
    const parkingPriceCalc = this.parkingFixedPrice * duration
    try {
      const temp = (typeof this.parkingPriceDB[i] === 'undefined') ? 0 : this.parkingPriceDB[i];;
      this.parkingPriceDB[i] = parkingPriceCalc;
      this.totalPrice = this.totalPrice + parkingPriceCalc - temp;
      this.rawPrice = this.rawPrice + parkingPriceCalc - temp;
    }
    catch (e) {
      this.parkingPriceDB.push(parkingPriceCalc);
      this.totalPrice += parkingPriceCalc;
      this.rawPrice += parkingPriceCalc;
    }
    this.formParking.value['parking'][i]['parkingPrice'] = parkingPriceCalc;
  }
  removeParking() {
    this.totalPrice -= this.formParking.value['parking'][this.parking.length - 1]['parkingPrice'];
    this.rawPrice -= this.formParking.value['parking'][this.parking.length - 1]['parkingPrice'];
    this.parking.removeAt(-1);
    this.endTimeArray.pop;
  }




  // SHOWS
  get show(): FormArray {
    return this.formShow.get('show') as FormArray;
  }

  addShow() {
    this.show.push(
      new FormGroup({
        shows: new FormControl(''),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
        wc: new FormControl(''),
        showQuantity: new FormControl(''),
        showPrice: new FormControl('')
      })
    );
  }

  onChangeShow(showName: string, i: number): void {
    const selectedShow = this.showsDB.find((item: { show_name: string; }) => item.show_name === showName);
    if (selectedShow) {
      this.formShow.value['show'][i]['startTime'] = selectedShow.start_time;
      this.formShow.value['show'][i]['endTime'] = selectedShow.end_time;
      this.formShow.value['show'][i]['wc'] = selectedShow.wc_accessible;
      this.formShow.value['show'][i]['showPrice'] = selectedShow.show_price;
      this.formShow.value['show'][i]['showQuantity'] = 1;
      this.totalPrice += selectedShow.show_price;
      this.rawPrice += selectedShow.show_price;

    }
  }

  increaseShow(i: number): void {
    this.formShow.value['show'][i]['showQuantity'] += 1;
    this.formShow.value['show'][i]['showPrice'] += 20;
    this.totalPrice += 20;
    this.rawPrice += 20;

  }

  decreaseShow(i: number): void {
    if (this.formShow.value['show'][i]['showQuantity'] > 1) {
      this.formShow.value['show'][i]['showQuantity'] -= 1;
      this.formShow.value['show'][i]['showPrice'] -= 20;
      this.totalPrice -= 20;
      this.rawPrice -= 20;

    }
  }

  removeShow() {
    this.totalPrice -= this.formShow.value['show'][this.show.length - 1]['showPrice'];
    this.rawPrice -= this.formShow.value['show'][this.show.length - 1]['showPrice'];

    this.show.removeAt(-1);
  }






  //STORES
  get stores(): FormArray {
    return this.formStore.get('stores') as FormArray;
  }

  addStore() {
    this.stores.push(
      new FormGroup({
        store: new FormControl(''),
        item: new FormControl(''),
        storeQuantity: new FormControl(''),
        storePrice: new FormControl('')
      })
    );
  }

  onChangeStoreItem(storeItemName: string, i: number): void {
    const selectedStoreItem = this.storeItemsDB[this.stores.length - 1].find((item: { menu_item_id: number; }) => item.menu_item_id === +storeItemName);
    if (selectedStoreItem) {
      this.formStore.value['stores'][i]['storePrice'] = selectedStoreItem.menu_item_unitprice;
      this.formStore.value['stores'][i]['storeQuantity'] = 1
    } else {
      this.storeItemsPriceDB.push(0.0);
    }
    this.totalPrice += selectedStoreItem.menu_item_unitprice;
    this.rawPrice += selectedStoreItem.menu_item_unitprice;

  }

  increaseStore(i: number): void {
    const unitPrice = this.formStore.value['stores'][i]['storePrice'] / this.formStore.value['stores'][i]['storeQuantity'];
    this.formStore.value['stores'][i]['storeQuantity'] += 1;
    this.formStore.value['stores'][i]['storePrice'] += unitPrice;
    this.totalPrice += unitPrice;
    this.rawPrice += unitPrice;
  }

  decreaseStore(i: number): void {
    if (this.formStore.value['stores'][i]['storeQuantity'] > 1) {
      const unitPrice = this.formStore.value['stores'][i]['storePrice'] / this.formStore.value['stores'][i]['storeQuantity'];
      this.formStore.value['stores'][i]['storeQuantity'] -= 1;
      this.formStore.value['stores'][i]['storePrice'] -= unitPrice;
      this.totalPrice -= unitPrice;
      this.rawPrice -= unitPrice;

    }
  }

  onChangeStoreItemQuantity(storeItemQuantity: string, i: number): void {
    const unitPrice = this.formStore.value['stores'][i]['storePrice'] / this.storeItemsQuantity[i];
    this.storeItemsPriceDB[i] = unitPrice * +storeItemQuantity;
    this.storeItemsQuantity[i] = +storeItemQuantity
  }

  removeStore() {
    this.totalPrice -= this.formStore.value['stores'][this.stores.length - 1]['storePrice'];
    this.rawPrice -= this.formStore.value['stores'][this.stores.length - 1]['storePrice'];

    this.stores.removeAt(-1);
  }

  //INSERT
  insertData() {
    this.http.post('http://127.0.0.1:5000/insert_multiple_visitors', this.formVisitor.value).subscribe(
      response => {
        console.log(response);
        // this.router.navigate(['/orderconfirmation']);
      },
      error => {
        console.log(error);
      }
    );
  }

}

