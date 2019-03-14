import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import { LoginComponent } from "./views/login/login.component";
import { HomeComponent } from "./views/home/home.component";
import { NotFoundComponent } from './views/not-found/not-found.component';

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import { TopNavigationLayoutComponent } from "./components/common/layouts/topNavigationlayout.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: 'starterview', pathMatch: 'full' },
  //{
  //  path: 'home', component: BasicLayoutComponent,
  //  children: [
  //    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } }]
  //},
  //{
  //  path: 'appviews', component: BlankLayoutComponent,
  //  children: [
  //    { path: 'login', component: LoginComponent, data: { title: 'Login' } }]
  //},
  //{
  //  path: 'appviews', component: BasicLayoutComponent, canActivate: [AuthGuard], data: { title: 'Home' },
  //  children: [
  //    {path: 'starterview', component: StarterViewComponent}
  //  ]
  //},
  //{ path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: { title: 'Customers' } },
  //{ path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: { title: 'Products' } },
  //{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: { title: 'Orders' } },
  //{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },
  //{ path: 'about', component: AboutComponent, data: { title: 'About Us' } },  
  //{ path: '**', redirectTo: 'starterview' }
  //{ path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }

  {
    path: '', component: BasicLayoutComponent, canActivate: [AuthGuard], data: { title: 'Home' },
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } }]
  },
  {
    path: '', component: TopNavigationLayoutComponent,
    children: [
      { path: '', component: HomeComponent}
    ]
  },  
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: 'Login' } }]
  },
  //{ path: 'customers', component: CustomersComponent, canActivate: [AuthGuard], data: { title: 'Customers' } },
  //{ path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: { title: 'Products' } },
  //{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard], data: { title: 'Orders' } },
  //{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },
  //{ path: 'about', component: AboutComponent, data: { title: 'About Us' } },
  { path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
