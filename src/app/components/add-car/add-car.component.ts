import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from 'app/models/car';
import { BrandService } from 'app/services/brand/brand.service';
import { CarService } from 'app/services/car.service';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  carAdd:FormGroup;
  brandId = [];
  colorId = [];
  constructor(private toastrService:ToastrService,
    private carService:CarService,
    private formBuilder:FormBuilder,
    private brandsService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }
  createCarAddForm(){
    this.carAdd = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["", [Validators.required, Validators.min(2010)]],
      dailyPrice:["", [Validators.required, Validators.min(0)]],
      description:["", [Validators.required, Validators.minLength(2)]],
      minFindeks:["", [Validators.required, Validators.min(1100), Validators.max(1900)]]
    })
    this.getBrands();
    this.getColors();
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

  add(){
    if (this.carAdd.valid) {
      let carModel:Car = Object.assign({}, this.carAdd.value);
      carModel.brandId = Number(carModel.brandId)
      carModel.colorId = Number(carModel.colorId)
      this.carService.postCarAdd(carModel).subscribe(response => {
        this.toastrService.success(response.messages, "Başarılı")
      },
      err=>{
        if (err.error.ValidationErrors.length>0) {
          err.error.ValidationErrors.forEach(element =>{
            this.toastrService.error(element.ErrorMessage, "Hata")
          })
        }
      })
    }
    else{
      this.toastrService.info("Formunuz Eksik", "Dikkat")
    }
  }

}
