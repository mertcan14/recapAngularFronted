import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Findeks } from 'app/models/findeks';
import { FindeksService } from 'app/services/findeks/findeks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {

  userFindeks:number;
  checkFindeksForm:FormGroup;
  carId:number;
  constructor(private formBuilder: FormBuilder,
    private findeksService:FindeksService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.carId=params["carId"]
        this.createCheckFindeksForm();
      }
    })
  }
  createCheckFindeksForm(){
    this.checkFindeksForm = this.formBuilder.group({
      kimlikNo:["", Validators.required]
    })
  }
   async check(){
    if (this.checkFindeksForm.valid) {
      let findeksModel:Findeks = Object.assign({}, this.checkFindeksForm.value);
      findeksModel.carId = this.carId;
      if (await this.findeksService.checkFindeksPointEnough(findeksModel)) {
        this.toastrService.success("Findeks Puanınız Yeterli", "Başarılı")
        this.router.navigate(["rentals/recourse/" + this.carId])
      }
      else{
        this.toastrService.info("Findeks Puanınız Yetersiz", "Üzgünüz")
        this.router.navigate(["/"])
      }
    }
  }


}
