import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from 'app/models/listResponseModel';
import { UserOperationClaim } from 'app/models/operationClaim/userOperationClaim';
import { UserOperationClaimDto } from 'app/models/operationClaim/userOperationClaimDto';
import { ResponseModel } from 'app/models/responseModel';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  apiUrl = "https://localhost:44364/api/useroperaitonclaims/"
  constructor(private httpClient:HttpClient) { }

  getOperaionClaimByUserId(userId:number):Observable<SingleResponseModel<UserOperationClaimDto>>{
    let newUrl = this.apiUrl + "userClaimdetail?userId=" + userId
    return this.httpClient.get<SingleResponseModel<UserOperationClaimDto>>(newUrl);
  }

  getOperaionClaim():Observable<ListResponseModel<UserOperationClaimDto>>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<UserOperationClaimDto>>(newUrl);
  }

  getDeleteByUserIdClaimName(userId:number, claimName:string):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "deletebyuseridclaimname?userId="+ userId +"&claimName=" + claimName;
    return this.httpClient.get<ResponseModel>(newUrl);
  }

  postAdd(userOperationClaim:UserOperationClaim):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add"
    console.log(userOperationClaim);
    return this.httpClient.post<ResponseModel>(newUrl, userOperationClaim);
  }

}
