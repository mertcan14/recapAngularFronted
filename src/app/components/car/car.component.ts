import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'app/models/carDto';
import { CarImage } from 'app/models/carImage/carImage';
import { CarService } from 'app/services/car.service';
import { CarImageService } from 'app/services/carImage/car-image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars:CarDto[] = [];
  carImages:CarImage[]=[];
  dataLoaded:boolean = false;
  dataDetailLoaded:boolean = false;
  filterText="";
  selectedBrand="";
  selectedColor="";
  localHost:string = "https://localhost:44364";
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private carImageService:CarImageService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["brandName"] && params["colorName"] ){
        this.getCarsByBrandColor(params["brandName"], params["colorName"]);
      }
      else if (params["brandName"]){
        this.getCarsBrandName(params["brandName"]);
      }
      else if(params["colorName"]){
        this.getCarsColorName(params["colorName"]);
      }
      else if(params["carId"]){
        this.getCarImage(params["carId"]);
        this.getCarById(params["carId"]);
      }
      else{
        this.getCars();
      }
    })
    
  }
  getCars(){
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  };
  getCarsByBrandColor(brandName:string, colorName:string){
    this.carService.getCarsByBrandColor(brandName, colorName).subscribe(response =>{
      this.cars= response.data;
      this.dataLoaded =true;
    });
  }
  getCarsBrandName(brandName){
    this.carService.getCarsByBrand(brandName).subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsColorName(colorName){
    this.carService.getCarsByColor(colorName).subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarImage(carId){
    this.carImageService.getCarImages(carId).subscribe(response =>{
      this.carImages = response.data;
      this.dataDetailLoaded=true;
      this.dataLoaded=true;
    })
  }
  getCarById(id){
    this.carService.getCarsById(id).subscribe(response =>{
      this.cars = response.data;
      this.dataDetailLoaded=true;
      this.dataLoaded=true;
    })
  }
  setCarouselActive(carImageId:number){
    if (carImageId == this.carImages[0].id) {
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  }
  goRecourse(){
    this.toastrService.success("Başvuru sayfasına yönlendiriliyorsunuz.")
  }
}
