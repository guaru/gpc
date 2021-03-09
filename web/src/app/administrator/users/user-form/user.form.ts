import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { of } from "rxjs";
import { Label } from "src/app/core/enums/Label";
export let options: FormlyFormOptions = {};
export let fields: FormlyFieldConfig[] = [
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
          type:'tel'
        }
      },
      {
        className: 'col-6',
        key: 'authorities',
        type: 'select',
        templateOptions: {
          label: Label.ROLES,
          multiple: true,
          options: [

          ],
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


