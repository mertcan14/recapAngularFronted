import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDto } from 'app/models/carDto';
import { HomePageCarManager } from 'app/models/homepage/homePageCarManager';
import { HomePageCar } from 'app/models/homepage/homPageCar';
import { CarService } from 'app/services/car.service';
import { HomepageService } from 'app/services/homePage/homepage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-homepagecar',
  templateUrl: './add-homepagecar.component.html',
  styleUrls: ['./add-homepagecar.component.css']
})
export class AddHomepagecarComponent implements OnInit {

  addHomeCarForm:FormGroup;
  status:boolean;
  cars:CarDto[] = []
  carsManager:HomePageCarManager[] = []
  formLoaded:boolean = false;
  dataLoaded:boolean = false;
  constructor(private homePageCarService:HomepageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.url)
    if (this.activatedRoute.snapshot.url[0].path == "add") {
      this.createHomeCarForm()
    }
    else{
      this.getAllCarsManager();
    }
  }

  getAllCarsManager(){
    this.homePageCarService.getCarsManager().subscribe(response=>{
      this.carsManager = response.data,
      this.dataLoaded = true
    },
    err=>{
      this.toastrService.error(err.error)
    })
  }

  updateStatus(statu:string, car:HomePageCarManager){
    let updateHomePageCar:HomePageCar = {
      id : car.id,
      addedDate : car.addedDate,
      carId : car.carId,
      index : car.index,
      status : car.status
    }
    if (statu == "Bekle") {
      updateHomePageCar.status = false
      this.homePageCarService.update(updateHomePageCar).subscribe(response=>{
        this.toastrService.success(response.messages, "Başarılı");
        setTimeout(function(){
          location.reload()
        },500)
      },
      err=>{
        this.toastrService.error(err.error)
      })
    }
    else if(statu == "Yayınla"){
      updateHomePageCar.status = true
      this.homePageCarService.update(updateHomePageCar).subscribe(response=>{
        this.toastrService.success(response.messages, "Başarılı");
        setTimeout(function(){
          location.reload()
        },500)
      },
      err=>{
        this.toastrService.error(err.error)
      })

    }
    else{
      this.toastrService.info("Güncelleme Olmadı")
    }
    
  }


  createHomeCarForm(){
    this.addHomeCarForm = this.formBuilder.group({
      carId:["", Validators.required],
      status:["", Validators.required],
      index:["", [Validators.required, Validators.min(1)]]
    })
    this.getAllCars();
    this.formLoaded = true
  }

  getAllCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    },
    err=>{
      this.toastrService.info(err.error)
    })
  }
  add(){
    if (this.addHomeCarForm.valid) {
      let homeCarModel:HomePageCar = Object.assign({}, this.addHomeCarForm.value)
      homeCarModel.carId = Number(homeCarModel.carId)
      this.homePageCarService.add(homeCarModel).subscribe(response=>{
        this.router.navigate(["/homepagecar"])
        this.toastrService.success(response.messages)
      },
      err=>{
        this.toastrService.error("Hata");
      })
    }
    else{
      this.toastrService.info("Formu Boş Bırakmayınız")
    }
  }

  delete(id:number){
    this.homePageCarService.delete(id).subscribe(response=>{
      window.location.reload();
      this.toastrService.success(response.messages, "Başarılı")
    },
    err=>{
      this.toastrService.info(err.error)
    })
  }

}
