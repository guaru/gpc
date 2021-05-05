import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Url } from 'src/app/core/enums/Url';
import { User } from 'src/app/core/models/user.model';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
@Component({
  selector: 'gpc-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  user: User;
  isAuthenticated: boolean;
  urlProfile = Url.CUENTA;

    constructor(public globalConstants:GlobalConstantsService,
              private authService:AuthService,
              public  router: Router) {
                  this.user =  this.authService.user || new User();
                  this.isAuthenticated =  this.authService.isAuthenticated();
    }

    ngOnInit(): void {

     }

    async logout(){
        let result:boolean = await  this.authService.logout();
        this.router.navigate(['/login']);
    }


}
