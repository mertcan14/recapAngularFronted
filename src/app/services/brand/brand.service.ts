import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from 'app/models/brand/brand';
import { BrandResponseModel } from 'app/models/brand/brandResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44364/api/brands/"
  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<BrandResponseModel>{
    let newUrl = this.apiUrl + "getall";
    return this.httpClient.get<BrandResponseModel>(newUrl);
  }
  getBrand(id:number):Observable<SingleResponseModel<Brand>>{
    let newUrl = this.apiUrl + "getbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newUrl);
  }
  postBrands(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl, brand);
  }
  postUpdateBrand(brand:Brand):Observable<ResponseModel>{
    let newUrl= this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newUrl, brand)
  }
}
