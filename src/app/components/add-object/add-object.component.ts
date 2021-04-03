import { Component, OnInit } from '@angular/core';


declare const $: any;
  declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
  export const ROUTES: RouteInfo[] = [
    { path: '/cars/add', title: 'Araç Ekle',  icon:'directions_car', class: 'bg-info text-white' },
    { path: '/colors/add', title: 'Renk Ekle',  icon:'color_lens', class: 'bg-primary text-white' },
    { path: '/brands/add', title: 'Marka Ekle',  icon:'content_paste', class: 'bg-success text-white' },
    { path: '/carsupdate', title: 'Araç Güncelle',  icon:'directions_car', class: 'bg-info text-dark' },
    { path: '/colorsupdate', title: 'Renk Güncelle',  icon:'color_lens', class: 'bg-primary text-dark' },
    { path: '/brandsupdate', title: 'Marka Güncelle',  icon:'content_paste', class: 'bg-success text-dark' },
    { path: '/carimage/add', title: 'Resim Ekle',  icon:'file_upload', class: 'bg-info text-white' },
];


@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {

  addItems:any[];
  constructor() { }

  ngOnInit(): void {
    this.addItems = ROUTES.filter(addItem => addItem)
  }

}
