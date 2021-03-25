import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {

  colorAdd:FormGroup;
  constructor(private toastrService:ToastrService,
     private colorService:ColorService,
     private formBuilder:FormBuilder
     ) { }

  ngOnInit(): void {
    this.createColorForm();
  }
  createColorForm(){
    this.colorAdd = this.formBuilder.group({
      colorName:["", Validators.required]
    })
  }
  add(){
    if (this.colorAdd.valid) {
        let colorModel = Object.assign({}, this.colorAdd.value);
        this.colorService.addColor(colorModel).subscribe(response=>{
          this.toastrService.success(response.messages, "Başarılı");
        },
        err=>{
          if (err.error.ValidationErrors.length>0) {
            err.error.ValidationErrors.forEach(element=>{
              this.toastrService.error(element.ErrorMessage, "Hata!")
            })
          }
        })
    }
    else{
      this.toastrService.info("Form Alanları eksik", "Dikkat!")
    }
  }

}
