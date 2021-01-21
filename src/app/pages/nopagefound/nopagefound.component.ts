import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from "../../shared/constants/GlobalConstant";
@Component({
  selector: 'gpc-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NopagefoundComponent {

  year  = new Date().getFullYear();
  title =  GlobalConstants.APP_NAME;

}
