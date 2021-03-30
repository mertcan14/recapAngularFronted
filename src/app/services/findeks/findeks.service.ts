import { Injectable } from '@angular/core';
import { Findeks } from 'app/models/findeks';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../car.service';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {

  constructor(
    private carService:CarService,
    private toastrService:ToastrService
  ) { }

  getFindeksPoint(kimlikNo:string){
    //sahte servis yazdığımız için 
    let findeksPoint = 1900;
    if (kimlikNo.indexOf("6") >= 0) {
      findeksPoint -= 100
    }
    if (kimlikNo.indexOf("0") >= 0) {
      findeksPoint -= 200
    }
    if (kimlikNo.indexOf("3") >= 0) {
      findeksPoint -= 300
    }
    if (kimlikNo.endsWith("2")) {
      findeksPoint -= 400
    }
    return findeksPoint;
  }

  async checkFindeksPointEnough(findeksModel:Findeks){
    let findeksPoint = this.getFindeksPoint(findeksModel.kimlikNo);
    let carFindeks: number =(await this.carService.getCarById(findeksModel.carId).toPromise()).data.minFindeks
    if (carFindeks <= findeksPoint) {
      return true
    }
    return false
  }
}
