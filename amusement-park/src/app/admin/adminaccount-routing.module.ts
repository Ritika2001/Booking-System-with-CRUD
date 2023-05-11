import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './adminlayout.component';
import { AdminLoginComponent } from './adminlogin.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: 'adminlogin', component: AdminLoginComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }