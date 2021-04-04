import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'app/models/brand/brand';
import { BrandService } from 'app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  brands:Brand[]=[];
  brand:Brand;
  dataBrands:boolean=false;
  updateBrands:boolean=false;
  updateBrandForm:FormGroup;
  filterBrandText:string ="";
  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getBrand(params["brandId"])
      }
      else{
        this.getBrands();
      }
    })
  }
  createUpdateBrandForm(){
    this.updateBrands=true;
    this.updateBrandForm = this.formBuilder.group({
      brandName:[this.brand.brandName, [Validators.required, Validators.minLength(3)]],
    })
  }
  update(){
    if (this.updateBrandForm.valid) {
      let brandForm = Object.assign({}, this.updateBrandForm.value);
      brandForm.id=this.brand.id;
      this.brandService.postUpdateBrand(brandForm).subscribe(response=>{
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
  getBrand(id:number){
    this.brandService.getBrand(id).subscribe(response=>{
      this.brand = response.data,
      this.createUpdateBrandForm()
      
    },
    err=>{
      this.toastrService.error("Listelenemedi", "Hata")
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data,
      this.dataBrands=true;
    },
    err=>{
      this.toastrService.error("Listelenemedi", "Hata")
    })
  }
}
