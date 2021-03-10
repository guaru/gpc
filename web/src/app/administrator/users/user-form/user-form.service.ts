import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { Label } from 'src/app/core/enums/Label';
import { Authoritie } from 'src/app/core/models/authorite.model';
import { User } from 'src/app/core/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { UserHttpService } from '../user-http.service';

@Injectable()
export class UserFormService {

  public _form: FormGroup;
  public _fields!: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: User;
  public _title:string = "Usuario";

  constructor(
    private alertService:AlertService,
    private loadingService:SpinnerService,
    private catalogService:CatalogHttpService,
    private userHttpService:UserHttpService

  ) {
     this._form =  new FormGroup({});
    this._options  = {};
     this.setFields();
   }

   public save():Promise<User|null>{
      return new Promise(resolve=>{
        if(this._form.valid){
          this._model.userName =  this._model.email;
          this.loadingService.initLoading();
          this.userHttpService.save(this._model).subscribe(data=>{
              this.loadingService.endLoading();
              resolve(data);
          },error=>{
               this.loadingService.endLoading();
               this.alertService.error();
              resolve(null);
          });
        }else
            resolve(null);
      });
   }



   private setFields(){
     this._fields = [
       {
         fieldGroupClassName: 'row',
         fieldGroup: [
           {
             className: 'col-6',
             type: 'input',
             key: 'name',
             templateOptions: {
               label: Label.NAME,
               required: true,
             },
           },
           {
             className: 'col-6',
             type: 'input',
             key: 'lastName',
             templateOptions: {
               label: Label.LAST_NAME,
               required: true,
             },
             expressionProperties: {
               'templateOptions.disabled': '!model.name',
             },
           },
           {
             className: 'col-6',
             type: 'input',
             key: 'email',
             templateOptions: {
               label: Label.EMAIL,
               required: true,
               type: "email"
             },
             validators: {
               validation: ['email'],
             },
           },
           {
             className: 'col-6',
             type: 'input',
             key: 'phone',
             templateOptions: {
               label: Label.PHONE,
               maxLength:10,
               minLength:10,
               type: 'tel'
             }
           },
           {
             className: 'col-6',
             key: 'authorities',
             type: 'select',
             templateOptions: {
               label: Label.ROLES,
               required:true,
               multiple: true,
               options:  this.catalogService.getAutorithies(),
             },
           },
           {
              className: 'col-6',
              key: 'office',
             type: 'select',
              templateOptions: {
                label: Label.OFFICE,
                required: true,
                options: this.catalogService.getOffices()
              },
            }
           , {
             className: 'col-3',
             key: "enabled",
             type: 'toggle',
             templateOptions: {
               label: Label.ENABLED,
               description: '',
             },
           }

         ],

       }
     ];
   }




}
