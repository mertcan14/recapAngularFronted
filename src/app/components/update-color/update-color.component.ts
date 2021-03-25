import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'app/models/color/color';
import { ColorService } from 'app/services/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {

  updateColorForm:FormGroup;
  colors:Color[]=[];
  color:Color;
  updateColors:boolean = false;
  dataColors:boolean = false;
  filterColorText:string ="";
  constructor(private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["colorId"]) {
        this.getColor(params["colorId"]);
      }
      else{
        this.getColors();
      }
    })
    
  }
  update(){
    if (this.updateColorForm.valid) {
      let colorModel = Object.assign({}, this.updateColorForm.value);
      colorModel.id=this.color.id;
      this.colorService.updateColor(colorModel).subscribe(response=>{
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
  }


  createUpdateColorForm(){
    this.updateColorForm = this.formBuilder.group({
      colorName:[this.color.colorName, Validators.required]
    })
    this.updateColors=true;
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataColors= true;
    },
    err=>{
      if (err.error.ValidationErrors.length > 0) {
        err.error.ValidationErrors.forEach(element => {
          this.toastrService.error(element.ErrorMessage, "Hata")
        });
      }
    })
  }
  getColor(id:number){
    this.colorService.getColor(id).subscribe(response=>{
      this.color = response.data;
      this.createUpdateColorForm();
    },
    err=>{
      this.toastrService.info("Beklenmedik bir hata oluştu", "Hata")
    })
  }
}
