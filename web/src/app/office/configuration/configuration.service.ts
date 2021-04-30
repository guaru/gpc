import { Injectable } from '@angular/core';
import { OfficeService } from 'src/app/administrator/offices/office.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Office } from 'src/app/core/models/office.model';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';

@Injectable()
export class ConfigurationService {

  office!: Office;
  private _qrdata: string = ''

  constructor(private officeService: OfficeService,
    private authService:AuthService,
    private globalEnv:GlobalEnviromentService) {

  }

  async setOffice(){
     const officeId:string =  this.authService.user?.office?.id || '';
     if(officeId.length > 0){
       this.office = await this.officeService.get(officeId);
       this._qrdata = `${this.globalEnv.env.HOST_PUBLIC}${this.office.id}`;
     }
  }

  public get qrdata():string{
      return this._qrdata;
  }




}
