import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from 'app/models/auth/register';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44364/api/users/"
  constructor(private httpClient:HttpClient) { }

  getUserById(id:number):Observable<SingleResponseModel<Register>>{
    let newUrl = this.apiUrl + "getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<Register>>(newUrl);
  }

  update(user:Register):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newUrl, user);
  }
}
