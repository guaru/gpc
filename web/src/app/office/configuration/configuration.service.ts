import { Injectable } from '@angular/core';
import { OfficeService } from 'src/app/administrator/offices/office.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Office } from 'src/app/core/models/office.model';

@Injectable()
export class ConfigurationService {

  office!: Office;

  constructor(private officeService: OfficeService, private authService:AuthService) {

  }

  async setOffice(){
     const officeId:string =  this.authService.user?.office?.id || '';
     if(officeId.length > 0){
       this.office = await this.officeService.get(officeId);
     }
  }



}
