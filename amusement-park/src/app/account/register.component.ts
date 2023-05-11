import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MustMatch } from '../_helpers/must-match.validator';
import { AccountService, AlertService } from '../_services';
import { LocationService } from '../_services/location.service';



@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    countries: any[] = [];
    states: any[] = [];
    cities: any[] = [];
    selectedCountry: any;
    selectedState: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private http: HttpClient,
        private locationService: LocationService
    ) {

        this.form = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
            country: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            street: new FormControl('', [Validators.required]),
            zipcode: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl('', [Validators.required]),
            member: new FormControl(false, [Validators.required])
        }, this.matchingPasswords);
    }

    ngOnInit() {

        this.locationService.getCountries().subscribe(
            response => {
                this.countries = response.data;
            },
            error => {
                console.log(error);
            }
        );


    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }


    onChangeCountry(countryName: string): void {
        this.selectedCountry = countryName;
        this.locationService.getStates(this.selectedCountry).subscribe(
            response => {
                this.states = response.data.states;
            },
            error => {
                console.log(error);
            }
        );

    }

    onChangeState(stateName: string): void {
        this.selectedState = stateName;
        this.locationService.getCities(this.selectedCountry, this.selectedState).subscribe(
            response => {
                this.cities = response.data;
            },
            error => {
                console.log(error);
            }
        );
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.form.value);

        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });

    }

    public matchingPasswords: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
        const password = c.get('passwords');
        const confirmPassword = c.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { mismatchedPasswords: true };
        }

        return null;
    };

}
