import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Brand } from 'app/models/brand/brand';
import { BrandService } from 'app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  dataLoaded:boolean = false;
  filterBrandText="";
  dataCarsLoaded=false;
  constructor(private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url =>{
      // if (url.filter(u => u.path? console.log(u.path):console.log("boş")) )
      if(url[0].path == "cars")
      {
        this.getBrands();
        this.dataCarsLoaded=true;
      }
      else{
        this.getBrands();
      }
    })
    
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded=true
    });
  }
  // setRouter(){
  //   if (this.selectedBrand === "") {
      
  //   }
  //   else{
  //     return "/cars/brand/" + this.selectedBrand
  //   }
  // }
}
