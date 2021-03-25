import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from 'app/models/color/color';
import { ColorResponseModel } from 'app/models/color/colorResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44364/api/colors/"
  constructor(private httpClient:HttpClient) { }
  getColors():Observable<ColorResponseModel>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<ColorResponseModel>(newUrl);
  }
  getColor(id:number):Observable<SingleResponseModel<Color>>{
    let newUrl = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Color>>(newUrl);
  }
  addColor(color:Color):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl, color);
  }
  updateColor(color:Color):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newUrl, color);
  }
}
