import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimsGuard implements CanActivate {
  constructor(private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = route.data['roles'] as Array<string>
    var claims = this.authService.getUserClaims();
      try{
        for (let index = 0; index < roles.length; index++) {
          if((claims.includes(roles[index]))){
            return true;
          }
        }
        this.router.navigate(["/"]);
        this.toastrService.info("Giriş için yetkiniz yetersiz")
        return false;
      }
      catch{
        this.router.navigate(["/"]);
        this.toastrService.info("Giriş için yetkiniz yetersiz Hata")
        return false;
      }

  }
  
}
