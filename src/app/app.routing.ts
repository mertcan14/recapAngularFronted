import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/auth-component/login/login.component';
import { RegisterComponent } from './components/auth-component/register/register.component';
import { ChangePasswordComponent } from './components/auth-component/change-password/change-password.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  { path: 'login',                                  component: LoginComponent },   
  { path: 'register',                               component: RegisterComponent },   
  { path: 'changepassword',                         component: ChangePasswordComponent },   
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
