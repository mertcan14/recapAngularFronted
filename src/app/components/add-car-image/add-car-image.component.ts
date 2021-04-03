import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'app/models/car';
import { CarDto } from 'app/models/carDto';
import { CarService } from 'app/services/car.service';
import { CarImageService } from 'app/services/carImage/car-image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car-image',
  templateUrl: './add-car-image.component.html',
  styleUrls: ['./add-car-image.component.css']
})
export class AddCarImageComponent implements OnInit {

  carId:number;
  dataLoaded:boolean = false;
  formLoaded:boolean = false;
  cars:CarDto[] = []
  car:CarDto[] = [];
  image:File;
  fileList:FileList;
  formData:FormData = new FormData();
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.carId = params["carId"]
        this.formLoaded = true;
        this.selectCar(params["carId"]);
      }
      else{
        this.getCars()
      }
    })
  }

  getCars(){
    this.dataLoaded = true
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data
    })
  }

  selectCar(carId:number){
    this.carService.getCarsById(carId).subscribe(response => {
      this.car = response.data
      console.log(this.car)
    })
    
  }

  fileChange(event) {

    if(event.target.files.length > 0){
      this.image = event.target.files[0];
    }
  }

  add(){
    console.log(this.image)
    this.formData.append('image', this.image)
    this.formData.append('carId', String(this.carId))
    this.carImageService.add(this.formData).subscribe(response=>{
            this.toastrService.success(response.messages)
          })
  }

}
