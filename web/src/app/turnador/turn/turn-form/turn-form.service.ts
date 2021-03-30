import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Office } from 'src/app/core/models/office.model';
import { Turn } from 'src/app/core/models/turn.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { Util } from 'src/app/core/utils/Util';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TurnHtppService } from '../turn-htpp.service';
import { TurnFurm } from './turn.form';
import {Client, IStompSocket} from '@stomp/stompjs';
import * as SocketJs from 'sockjs-client';
import { GlobalEnviromentService } from 'src/app/core/services/global-enviroment.service';
import { ApiUri } from 'src/app/core/enums/ApiUri';

@Injectable()
export class TurnFormService {

  private _areas!: any[];
  private _office!:Office;
  public model!: Turn;
  public fields!: FormlyFieldConfig[];
  public form: FormGroup;
  public options: FormlyFormOptions;
  private client!: Client;

  constructor(private catalogService:CatalogHttpService,
    private loadingService:SpinnerService,
    private turnHttpService:TurnHtppService,
    private alertService:AlertService,
    private globalEnv:GlobalEnviromentService) {
      this.form =  new FormGroup({});
      this.options  = {};
    }


   public initSocket(){
       this.client =  new Client();
       this.client.webSocketFactory = () => {
         return new SocketJs(`${this.globalEnv.env.URL_API}${ApiUri.SOCKET_TURNADOR}`) as IStompSocket;
       };
       this.client.onConnect = (frame) => {
            console.log(frame);
       }

       this.client.activate();
  }

  public endSocket(){
    this.client.onDisconnect = (frame)=>{
       console.log("FINISH SOCKET");
    }
    this.client.deactivate();
  }



  public async buildFileds()
  {
     this.loadingService.initLoading();
     let form =  new TurnFurm(Util.arrayToOption(this._office.areas || []));
     this.fields =  form.buildFields();
     this.loadingService.endLoading();
  }


  save(): Promise<Turn | null> {
    return new Promise((resolve) => {
        resolve(this.model);
      /*if (this.form.valid) {
        this.loadingService.initLoading();
        this.turnHttpService.save(this.getModel()).subscribe(async (data: Turn) => {
          this.loadingService.endLoading();
          await this.alertService.success();
          resolve(data);
        }, async error => {
          this.loadingService.endLoading();
          await this.alertService.error();
          resolve(null);
        });
      }*/
    })

  }

  public reset(){
    this.options.resetModel;
    this.model = {};
  }

  public setOffice(office:Office){
    this._office =  office;
  }

  public setModel(model:Turn){
      this.model =  model;
  }


  public getModel(){
    return this.model;
  }


}
