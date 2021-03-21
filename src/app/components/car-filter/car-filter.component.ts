import { Component, OnInit } from '@angular/core';
import { Brand } from 'app/models/brand/brand';
import { Color } from 'app/models/color/color';
import { BrandService } from 'app/services/brand/brand.service';
import { ColorService } from 'app/services/color/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[]=[];
  colors:Color[]=[];
  brandsFilter:string="";
  colorsFilter:string="";
  constructor(private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
    })
  }
}
