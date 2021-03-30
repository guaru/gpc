import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { Url } from '../../enums/Url';
import { Confirmation } from '../../models/confirmation.model';
import { AlertService } from '../../services/alert.service';
import { GlobalConstantsService } from '../../services/global-constants.service';
import { ConfirmationService } from './confirmation.service';
@Component({
  selector: 'gpc-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [ConfirmationService]
})
export class ConfirmationComponent implements OnInit  {

  public uuid: string | null | undefined;
  public userName: string | null | undefined;

  constructor(public globalConstants:GlobalConstantsService,
    public confirmationService: ConfirmationService,
    private  router: Router,
    private alertService:AlertService,
    private route: ActivatedRoute ){

      if(this.route.snapshot.paramMap.get("UUID")){
        this.uuid = this.route.snapshot.paramMap.get("UUID");
      }
      
      this.userName = this.route.snapshot.paramMap.get("USERNAME");

      this.confirmationService._model = new Confirmation(this.userName);
  
      this.confirmationService.validateConfirmation(this.userName ,this.uuid);

  }
  ngOnInit() {
    

    /*if(this.confirmationService.authService.isAuthenticated()){
      this.router.navigate([Url.HOME]);
    }*/
  }

 async onClickConfirmation(){
         this.confirmationService.confirmation();
  }

}
