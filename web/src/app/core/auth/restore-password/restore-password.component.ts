import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { Url } from '../../enums/Url';
import { Confirmation } from '../../models/confirmation.model';
import { AlertService } from '../../services/alert.service';
import { GlobalConstantsService } from '../../services/global-constants.service';
import { RestorePasswordService } from './restore-password.service';
@Component({
  selector: 'gpc-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css'],
  providers: [RestorePasswordService]
})
export class RestorePasswordComponent implements OnInit  {

  public uuid: string | null | undefined;
  public userName: string | null | undefined;

  constructor(public globalConstants:GlobalConstantsService,
    public restorePasswordService: RestorePasswordService,
    private  router: Router,
    private alertService:AlertService,
    private route: ActivatedRoute ){
      if(this.route.snapshot.paramMap.get("UUID")){
        this.uuid = this.route.snapshot.paramMap.get("UUID");
      }
      
      this.userName = this.route.snapshot.paramMap.get("USERNAME");

      this.restorePasswordService._model = new Confirmation(this.userName);
  
      this.restorePasswordService.validateRecover(this.userName ,this.uuid);

  }
  ngOnInit() {
    
  }

 async onClickRestorePassword(){
    this.restorePasswordService.restorestorePasswordre();
  }

}
