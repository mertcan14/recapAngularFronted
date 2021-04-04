import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/cars', title: 'Arabalar',  icon:'directions_car', class: '' },
    { path: '/rentals', title: 'Kiralanan',  icon:'car_rental', class: '' },
    { path: '/colors', title: 'Renkler',  icon:'color_lens', class: '' },
    { path: '/brands', title: 'Markalar',  icon:'content_paste', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
