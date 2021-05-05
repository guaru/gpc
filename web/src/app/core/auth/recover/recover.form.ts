import { FormlyFieldConfig } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { Label } from "src/app/core/enums/Label";
export class RecoverForm
{
  private _fields: FormlyFieldConfig[];

  constructor(){
    this._fields = [];
  }

  public buildFields(): FormlyFieldConfig[]
  {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
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

        ],

      }
    ];
  }

}

