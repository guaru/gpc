import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from "../../shared/constants/GlobalConstant";
@Component({
  selector: 'gpc-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class Component404 {

  year  = new Date().getFullYear();
  title =  GlobalConstants.APP_NAME;

}
