import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponseModel } from 'app/models/customer/customerResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44364/api/customers/"
  constructor(private httpClient:HttpClient) { }
  getCustomer():Observable<CustomerResponseModel>{
    let newUrl=this.apiUrl + "getall";
    return this.httpClient.get<CustomerResponseModel>(newUrl);
  }

}
