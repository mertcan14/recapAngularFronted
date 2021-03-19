import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImageResponseModel } from 'app/models/carImage/carImageResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44364/api/carimages/"
  constructor(private httpClient:HttpClient) { }
  getCarImages(carId:number):Observable<CarImageResponseModel>{
    let newUrl = this.apiUrl + "car/" + carId;
    return this.httpClient.get<CarImageResponseModel>(newUrl);
  }
}
