import { Component, OnInit } from '@angular/core';
import { GlobalConstants  } from "../constants/GlobalConstant";
@Component({
  selector: 'gpc-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  LOGO_ICON = GlobalConstants.LOGO_ICON;
  LOGO_L_ICON = GlobalConstants.LOGO_LIGTH_ICON;
  LOGO_TEXT = GlobalConstants.LOGO_TEXT;
  LOGO_L_TEXT = GlobalConstants.LOGO_LIGHT_TEXT;
  APP_NAME  = GlobalConstants.APP_NAME;

  constructor() { }

  ngOnInit(): void {

  }

}
