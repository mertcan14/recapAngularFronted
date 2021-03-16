import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from 'app/models/carResponseModel';
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
  getCarsById(id:number):Observable<CarResponseModel>{
    let newUrl = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<CarResponseModel>(newUrl);
  }
}
