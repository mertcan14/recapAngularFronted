import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'app/models/auth/login';
import { Register } from 'app/models/auth/register';
import { Token } from 'app/models/auth/token';
import { SingleResponseModel } from 'app/models/singleResponseModel';
import { Observable } from 'rxjs';
import { LocalstroageService } from '../localstroage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName:string;
  email:string;
  userNameIdentifier:number;
  userClaims:string[] = [];

  apiUrl = "https://localhost:44364/api/auth/"
  jwtHelper:JwtHelperService = new JwtHelperService();
  constructor(private httpClient:HttpClient,
    private storageService:LocalstroageService,
    private toastrService:ToastrService,
    private router:Router) {
      this.isAuth();
     }

  login(loginModel:Login){
    let newUrl = this.apiUrl + "login"
    this.httpClient.post<SingleResponseModel<Token>>(newUrl, loginModel).subscribe(response=>{
      this.toastrService.success(response.messages, "Başarılı")
      this.storageService.setToken(response.data.token)
      this.setUserName();
      this.setUserClaims();
      this.setNameIdentifier();
      this.setEmail();
      this.router.navigate(["/"])
    },
    err=>{
      this.toastrService.error(err.error,"Hata")
    })
  }

  register(registerModel:Register){
    let newUrl = this.apiUrl + "register"
    this.httpClient.post<SingleResponseModel<Token>>(newUrl, registerModel).subscribe(response=>{
      this.toastrService.success(response.messages, "Başarılı")
      this.storageService.setToken(response.data.token)
      this.setUserName();
      this.router.navigate(["/"])
    },
    err=>{
      this.toastrService.error(err.error,"Hata")
    })
  }

  changePassword(loginModel:Login){
    let newUrl = this.apiUrl + "changepassword"
    this.httpClient.post<SingleResponseModel<Token>>(newUrl, loginModel).subscribe(response=>{
      this.toastrService.success(response.messages, "Başarılı")
      this.router.navigate(["/"])
    },
    err=>{
      this.toastrService.error(err.error,"Hata")
    })
  }




  isAuth(){
    let expired = this.jwtHelper.isTokenExpired(this.storageService.getToken())
    if (!expired) {
      return true
    }
    else{
      this.storageService.removeToken();
      return false
    }
  }
  
  setNameIdentifier(){
    var decoded = this.getDecodedToken()
    var propUserName = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
    this.userNameIdentifier = Number(decoded[propUserName]);
  }
  getNameIdentifier(){
    this.setNameIdentifier();
    return this.userNameIdentifier;
  }

  setUserClaims(){
    var decoded = this.getDecodedToken()
    var propClaims = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
    console.log(decoded[propClaims])
    this.userClaims = decoded[propClaims];
  }
  getUserClaims(){
    this.setUserClaims();
    return this.userClaims;
  }

  setEmail(){
    var decoded = this.getDecodedToken()
    var propEmail = Object.keys(decoded).filter(x => x.endsWith("email"))[0];
    this.email = String(decoded[propEmail]);
  }
  getEmail(){
    this.setEmail();
    return this.email;
  }


  setUserName(){
    var decoded = this.getDecodedToken()
    var propUserName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0];
    this.userName = decoded[propUserName];
  }
  getUserName(): string {
    this.setUserName();
    return this.userName;
  }

  logOut() {
    this.storageService.removeToken();
    this.toastrService.success("Çıkış yapıldı","Başarılı")
    setTimeout(function(){
      location.reload()
    },400)
  }

  getDecodedToken(){
    try{
      return this.jwtHelper.decodeToken(this.storageService.getToken());
    }
    catch(Error){
        return null;
    }
  }
}
