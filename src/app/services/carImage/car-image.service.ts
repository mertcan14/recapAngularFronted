import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from 'app/models/carImage/carImage';
import { CarImageResponseModel } from 'app/models/carImage/carImageResponseModel';
import { ResponseModel } from 'app/models/responseModel';
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
  add(image):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newUrl, image);
  }
}
