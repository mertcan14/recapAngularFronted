import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentalDto } from 'app/models/rental/rentalDto';
import { Rental } from 'app/models/rental/rental';
import { RentalDtoResponseModel } from 'app/models/rental/rentalResponseModel';
import { ResponseModel } from 'app/models/responseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44364/api/rentals/";
  constructor(private httpClient:HttpClient) { }
  getRental():Observable<RentalDtoResponseModel>{
    let newUrl = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<RentalDtoResponseModel>(newUrl);
  }
  postCheck(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "checkrental";
    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }
  postAdd(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newUrl, rental)
  }
}
