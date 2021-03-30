import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { Label } from "src/app/core/enums/Label";
import { Authoritie } from "src/app/core/models/authorite.model";
import { Office } from "src/app/core/models/office.model";
export class UserForm
{
  private _fields: FormlyFieldConfig[];
  private _authorities: Observable<any[]>;
  private _offices:     Observable<any[]>;
  private _operator :boolean =  false;
  private _officeId :string;

  constructor(authorities:Observable<any[]>,offices:Observable<any[]>,operator?:boolean,officeId?:string){
    this._fields = [];
    this._authorities =  authorities;
    this._offices =  offices;
    this._operator = operator || false;
    this._officeId =  officeId || '';
  }

  public buildFields(): FormlyFieldConfig[]
  {
    return [
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
              maxLength: 10,
              minLength: 10,
              type: 'tel'
            }
          },
          {
            className: 'col-6',
            key: 'authorities',
            type: 'select',
            defaultValue: this._operator ? ["6032fff88eb6c936593425f8"] : [''],
            templateOptions: {
              label: Label.ROLES,
              required: true,
              multiple: true,
               options: this._authorities,
               readonly : this._operator,
                disabled: this._operator
            },
          },
          {
            className: 'col-6',
            key: 'office',
            type: 'autocomplete',
            defaultValue : this._officeId,
            templateOptions: {
              label: Label.OFFICE,
              required: true,
              //options: this._offices,
              readonly  : this._operator,
              disabled: this._operator
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

