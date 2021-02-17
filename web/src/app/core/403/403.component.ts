import { Component, OnInit } from '@angular/core';
import { GlobalConstantsService } from '../services/global-constants.service';

@Component({
  selector: 'gpc-403',
  templateUrl: './403.component.html',
  styleUrls: ['./403.component.css']
})
export class Component403 {

  constructor(public globalConstants:GlobalConstantsService){

  }
  year  = new Date().getFullYear();


}
