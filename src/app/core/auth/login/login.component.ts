import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../../shared/constants/GlobalConstant";
@Component({
  selector: 'gpc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  recover : boolean =  false;
  LOGO_ICON = GlobalConstants.LOGO_ICON;
  LOGO_TEXT = GlobalConstants.LOGO_TEXT;
  APP_NAME  = GlobalConstants.APP_NAME;

  onClickRecover(){
    this.recover = true;
  }

}
