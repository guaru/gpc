import { Component, OnInit } from '@angular/core';
import { GlobalConstantsService } from '../services/global-constants.service';

@Component({
  selector: 'gpc-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.css']
})
export class Component404 {

  constructor(public globalConstants:GlobalConstantsService){

  }
  year  = new Date().getFullYear();


}
