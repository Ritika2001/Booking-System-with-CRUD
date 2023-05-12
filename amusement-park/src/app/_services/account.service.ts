import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/';
import { Admin } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    private adminSubject: BehaviorSubject<Admin>;
    public user: Observable<User>;
    public admin: Observable<Admin>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();

        this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')!));
        this.admin = this.adminSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get adminValue(): Admin {
        return this.adminSubject.value;
    }

    login(email: any, password: any) {
        return this.http.post<User>('http://127.0.0.1:5000/login', { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    adminlogin(email: any, password: any) {
        return this.http.post<Admin>('http://127.0.0.1:5000/adminlogin', { email, password })
            .pipe(map(admin => {
                // store admin details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('admin', JSON.stringify(admin));
                this.adminSubject.next(admin);
                return admin;
            }));
    }


    adminlogout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('admin');
        this.router.navigate(['/']);
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.router.navigate(['/']);
    }

    register(user: User) {
        return this.http.post('http://127.0.0.1:5000/insert_visitors', user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.user_id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.user_id) {
                    this.logout();
                }
                return x;
            }));
    }
}