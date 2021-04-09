import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarWithImageDto } from 'app/models/homepage/carWithImageDto';
import { HomePageCarManager } from 'app/models/homepage/homePageCarManager';
import { HomePageCar } from 'app/models/homepage/homPageCar';
import { ListResponseModel } from 'app/models/listResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  apiUrl = "https://localhost:44364/api/homepagecars/"
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarWithImageDto>>{
    let newUrl = this.apiUrl + "getallcardetail"
    return this.httpClient.get<ListResponseModel<CarWithImageDto>>(newUrl);
  }

  getCarsManager():Observable<ListResponseModel<HomePageCarManager>>{
    let newUrl = this.apiUrl + "getallmanager"
    return this.httpClient.get<ListResponseModel<HomePageCarManager>>(newUrl);
  }

  add(homePageCar:HomePageCar):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newUrl, homePageCar);
  }
  
  update(homePageCar:HomePageCar):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newUrl, homePageCar);
  }

  delete(id:number):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "delete?id=" + id 
    return this.httpClient.get<ResponseModel>(newUrl);
  }
}
