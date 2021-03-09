import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { Label } from 'src/app/core/enums/Label';
import { User } from 'src/app/core/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import {fields as FORM_FIELDS, options as FORM_OPTIONS} from './user.form'

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
    private catalogService:CatalogHttpService

  ) {
     this._form =  new FormGroup({});
     this._options =  FORM_OPTIONS;
     this.setFields();
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
               label: Label.CORREO_ELECTRONICO,
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
               required: true,
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
               options: this.catalogService.getAutorithies(),
               valueProp: 'id',
               labelProp: 'name',
             },
           },
           /* {
              className: 'col-6',
              key: 'office',
              type: 'autocomplete',
              templateOptions: {
                label: Label.OFFICE

              },
            }*/


         ],

       }
     ];
   }




}
