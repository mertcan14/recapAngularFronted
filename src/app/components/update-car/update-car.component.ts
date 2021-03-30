import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'app/models/car';
import { CarDto } from 'app/models/carDto';
import { BrandService } from 'app/services/brand/brand.service';
import { CarService } from 'app/services/car.service';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css']
})
export class UpdateCarComponent implements OnInit {

  cars:CarDto[]=[]
  car:Car;
  brandId = [];
  colorId = [];
  updateCarForm:FormGroup;
  dataCars:boolean=false;
  updateCars:boolean=false;
  filterText:string ="";
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private carService:CarService,
    private brandsService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params["carId"]) {
        this.getCar(params["carId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  getBrands(){
    this.brandsService.getBrands().subscribe(response=>{
      this.brandId = response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colorId = response.data
    })
  }

  update(){
    if (this.updateCarForm.valid) {
      let carModel = Object.assign({}, this.updateCarForm.value);
      carModel.id=this.car.id;
      carModel.brandId = Number(carModel.brandId)
      carModel.colorId = Number(carModel.colorId)
      this.carService.postCarUpdate(carModel).subscribe(response=>{
        this.toastrService.success(response.messages,"Başarılı")
      },
      err=>{
        if (err.error.ValidationErrors.length > 0) {
          err.error.ValidationErrors.forEach(element => {
            this.toastrService.error(element.ErrorMessage, "Hata")
          });
        }
      })
    }
  }

  createUpdateCarForm(){
    this.updateCarForm = this.formBuilder.group({
      brandId:[this.car.brandId,Validators.required],
      colorId:[this.car.colorId,Validators.required],
      modelYear:[this.car.modelYear, Validators.required],
      dailyPrice:[this.car.dailyPrice, Validators.required],
      description:[this.car.description, Validators.required],
      minFindeks:[this.car.minFindeks, Validators.required]
    })
    this.getBrands();
    this.getColors();
    this.updateCars =true;
  }
  getCar(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.car = response.data;
      this.createUpdateCarForm();
    },
    err=>{
      this.toastrService.error("Listelenemedi", "Hata")
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataCars=true;
    },
    err=>{
      this.toastrService.error("Listelenemedi", "Hata")
    })
  }
}
