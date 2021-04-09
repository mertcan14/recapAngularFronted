import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';


declare const $: any;
  declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
  export const Admin: RouteInfo[] = [
    { path: '/cars/add', title: 'Araç Ekle',  icon:'directions_car', class: 'bg-info text-white' },
    { path: '/colors/add', title: 'Renk Ekle',  icon:'color_lens', class: 'bg-primary text-white' },
    { path: '/brands/add', title: 'Marka Ekle',  icon:'content_paste', class: 'bg-success text-white' },
    { path: '/carsupdate', title: 'Araç Güncelle',  icon:'directions_car', class: 'bg-info text-dark' },
    { path: '/colorsupdate', title: 'Renk Güncelle',  icon:'color_lens', class: 'bg-primary text-dark' },
    { path: '/brandsupdate', title: 'Marka Güncelle',  icon:'content_paste', class: 'bg-success text-dark' },
    { path: '/carimage/add', title: 'Resim Ekle',  icon:'file_upload', class: 'bg-info text-white' },
    { path: '/user/claims', title: 'Yönetici Yetkileri',  icon:'manage_accounts', class: 'bg-primary text-white' },
    { path: '/homepagecar', title: 'Vitrin Araçları',  icon:'car_rental', class: 'bg-success text-white' }
];

export const ProductAdd: RouteInfo[] = [
  { path: '/cars/add', title: 'Araç Ekle',  icon:'directions_car', class: 'bg-info text-white' },
  { path: '/colors/add', title: 'Renk Ekle',  icon:'color_lens', class: 'bg-primary text-white' },
  { path: '/brands/add', title: 'Marka Ekle',  icon:'content_paste', class: 'bg-success text-white' },
  { path: '/carimage/add', title: 'Resim Ekle',  icon:'file_upload', class: 'bg-info text-white' }
];

export const ProductUpdate: RouteInfo[] = [
  { path: '/carsupdate', title: 'Araç Güncelle',  icon:'directions_car', class: 'bg-info text-dark' },
  { path: '/colorsupdate', title: 'Renk Güncelle',  icon:'color_lens', class: 'bg-primary text-dark' },
  { path: '/brandsupdate', title: 'Marka Güncelle',  icon:'content_paste', class: 'bg-success text-dark' }
];


@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {

  addItems:any[];
  userClaims:string[]=[];
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.checkUserClaim();
  }

  async checkUserClaim(){
    await this.getUserClaims();
    console.log(this.userClaims)
    if (this.userClaims.includes("admin")) {
      this.addItems = Admin.filter(addItem => addItem)
    }
    else if(this.userClaims.includes("productAdd")){
      this.addItems = ProductAdd.filter(addItem => addItem)
    }
    else if(this.userClaims.includes("productUpdate")){
      this.addItems = ProductUpdate.filter(addItem => addItem)
    }
  }

  getUserClaims(){
    this.userClaims = this.authService.getUserClaims();
  }

}
