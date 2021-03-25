import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  brandAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }
  createBrandForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["", Validators.required]
    })
  }
  add(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.postBrands(brandModel).subscribe(response=>{
        this.toastrService.success(response.messages, "Başarılı")
      },
      err=>{
        if (err.error.ValidationErrors.length > 0) {
          err.error.ValidationErrors.forEach(element => {
            this.toastrService.error(element.ErrorMessage, "Hata")
          });
        }
      })

    }
    else{
      this.toastrService.info("Formunuz Eksik", "Dikkat!")
    }
  }
}
