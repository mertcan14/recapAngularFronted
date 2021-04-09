import { Component, OnInit } from '@angular/core';
import { CarWithImageDto } from 'app/models/homepage/carWithImageDto';
import { HomepageService } from 'app/services/homePage/homepage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  localHost:string = "https://localhost:44364";
  cars:CarWithImageDto[]=[]
  constructor(private homePageService:HomepageService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getallCars();
  }

  getallCars(){
    this.homePageService.getCars().subscribe(response=>{
      this.cars = response.data
    }, 
    err=>{
      console.log(err)
      this.toastrService.info("Beklenmedik Hata Oluştu", "Dikkat")
    })
  }

  setCarouselActive(carId:number, imagePath:string){
    let car = this.cars.find(c => c.carId == carId)
    if (car.imagePath[0] == imagePath) {
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  }

}
