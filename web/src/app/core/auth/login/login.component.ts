import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Url } from '../../enums/Url';
import { AlertService } from '../../services/alert.service';
import { GlobalConstantsService } from '../../services/global-constants.service';
import { LoginService } from './login.service';
@Component({
  selector: 'gpc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit  {


  constructor(public globalConstants:GlobalConstantsService,
    public loginService: LoginService,
    private  router: Router,
    private alertService:AlertService ){

  }
  ngOnInit(): void {
     if(this.loginService.authService.isAuthenticated()){
       this.router.navigate([Url.RECOVER]);
     }
  }

  onClickRecover(){
    this.router.navigate([Url.RECOVER]);
  }

 async onClickLogin(){
         this.loginService.login();
  }

}
