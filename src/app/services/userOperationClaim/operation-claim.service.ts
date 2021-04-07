import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'app/models/listResponseModel';
import { OperationClaim } from 'app/models/operationClaim/operationClaim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimService {

  apiUrl = "https://localhost:44364/api/operationclaims/"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<OperationClaim>>{
    let newUrl= this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newUrl);
  }
}
