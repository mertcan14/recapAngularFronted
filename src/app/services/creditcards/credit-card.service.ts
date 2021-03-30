import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCard } from 'app/models/creditCard/creditCard';
import { ListResponseModel } from 'app/models/listResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = "https://localhost:44364/api/creditcards/"
  constructor(private httpClient:HttpClient) { }

  add(creditcard:CreditCard):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newUrl, creditcard)
  }

  getbyUserId(userId:number):Observable<ListResponseModel<CreditCard>>{
    let newUrl = this.apiUrl + "getbyuserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newUrl)
  }

  delete(id:number):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "delete?id=" + id;
    return this.httpClient.get<ResponseModel>(newUrl);
  }
}
