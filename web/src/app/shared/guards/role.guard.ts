import { ArrayDataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Url } from 'src/app/core/enums/Url';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {


  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.validate(childRoute);
   }


  private validate(route: ActivatedRouteSnapshot):boolean{
     const roles: string[] = route.data['rol'] as string[];

     for (let i = 0; i < roles.length; i++) {
       if (this.authService.hasRole(roles[i]))
         return true;
     }
     this.router.navigate([Url._403]);
     return false;
   }

}
