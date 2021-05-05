import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from './../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalConstantsService } from 'src/app/core/services/global-constants.service';
import { UserHttpService } from './../user-http.service';
import { IEnabled } from 'src/app/core/interface/IEnabled';
import { UserFormService } from 'src/app/shared/components/user-form/user-form.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Office } from 'src/app/core/models/office.model';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'gpc-account',
  templateUrl: './account.component.html',
  providers: [UserService, UserHttpService, UserFormService, ChangePasswordService]
})
export class AccountComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  user: User = new User();
  office: Office = new Office();
  officeName: string  = '';

  constructor(public constantService: GlobalConstantsService, public changePasswordService: ChangePasswordService) { 
    this.changePasswordService.getUser();
  }



  ngAfterViewInit():void  {
    
  }

  onChangeEnabled($event: boolean, id: string) {
    
  }

  onChangePassword(){
    debugger;
     this.changePasswordService.changePassword();
  }

}
