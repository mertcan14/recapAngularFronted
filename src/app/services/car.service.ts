import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from 'app/models/car';
import { CarDto } from 'app/models/carDto';
import { CarResponseModel } from 'app/models/carResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44364/api/cars/"
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
  getCarsByBrand(brandName:string):Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getcarbybrand?brandName=" + brandName
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
  getCarsByColor(colorName:string):Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getcarbycolor?colorName=" + colorName
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
  getCarsByBrandColor(brandName:string,colorName:string):Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getcarbybrandcolor?brandName=" + brandName + "&colorName="+colorName;
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
  getCarsById(id:number):Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
  getCarById(id:number):Observable<SingleResponseModel<Car>>{
    let newUrl = this.apiUrl + "getcarbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Car>>(newUrl);
  }
  postCarAdd(car:Car):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
  postCarUpdate(car:Car):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}
