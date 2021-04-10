import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockedUser } from 'app/models/auth/blockedUser';
import { ListResponseModel } from 'app/models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockedUserService {

  apiUrl = "https://localhost:44364/api/blockedusers/"
  constructor(private httpClient:HttpClient) { }
  getAll():Observable<ListResponseModel<BlockedUser>>{
    let newUrl = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<BlockedUser>>(newUrl);
  }
}
