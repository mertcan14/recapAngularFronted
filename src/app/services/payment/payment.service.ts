import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardDto } from 'app/models/creditCard/creditCardDto';
import { ResponseModel } from 'app/models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44364/api/payments/"
  constructor(private httpClient:HttpClient) { }

  payToRental(creditCard:CreditCardDto):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "pay";
    console.log(creditCard)
    return this.httpClient.post<ResponseModel>(newUrl, creditCard)
  }
}
