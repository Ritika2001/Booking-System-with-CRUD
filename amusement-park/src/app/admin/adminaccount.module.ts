import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './adminaccount-routing.module';
import { AdminLayoutComponent } from './adminlayout.component';
import { AdminLoginComponent } from './adminlogin.component';
import { AdminComponent } from './admin.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        AdminLayoutComponent,
        AdminLoginComponent,
        AdminComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AccountModule { }