import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services';

@Component({ templateUrl: 'adminlayout.component.html' })
export class AdminLayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}