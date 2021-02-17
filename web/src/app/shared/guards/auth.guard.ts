import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad, CanActivateChild {

  constructor(private authService:AuthService, private router:Router,private alertService: AlertService){

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return  this.validate();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validate();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return  this.validate();
  }


  private validate():boolean{
    if (this.authService.isAuthenticated()) {
      if(this.authService.isTokenExpired()){
        this.alertService.info('La sesión ha expirado, inicie sesión de nuevo');
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }



}
