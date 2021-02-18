import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { INav } from 'src/app/core/interface/INav';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';

@Component({
  selector: 'gpc-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent implements OnInit {

  _functions :INav[]
  constructor(public glabalConstants:GlobalConstantsService, private authService:AuthService) {
     this._functions = this.authService.functions || [];
   }

   ngOnInit(): void {

   }

}
