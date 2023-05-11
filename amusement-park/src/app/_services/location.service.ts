import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    private countryAPI = 'https://countriesnow.space/api/v0.1/countries';

    private stateAPI = 'https://countriesnow.space/api/v0.1/countries/states';

    private cityAPI = 'https://countriesnow.space/api/v0.1/countries/state/cities';

    constructor(private http: HttpClient) { }

    getCountries(): Observable<any> {
        return this.http.get<any>(this.countryAPI);
    }

    getStates(country: string): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const stateBody = {
            "country": country
        };
        return this.http.post(this.stateAPI, stateBody, { headers });
    }

    getCities(country: string, state: string): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const cityBody = {
            "country": country,
            "state": state
        };
        return this.http.post(this.cityAPI, cityBody, { headers });
    }

}
