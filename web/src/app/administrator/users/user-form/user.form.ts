import { FormlyFieldConfig } from "@ngx-formly/core";
import { Label } from "src/app/core/enums/Label";

export let fields: FormlyFieldConfig[]  = [
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

        templateOptions: {
          label: Label.ROLES,
          required: true,
          multiple: true,
         // options: this.catalogService.getAutorithies(),
        },
      },
      {
        className: 'col-6',
        key: 'office',
        type: 'select',

        templateOptions: {
          label: Label.OFFICE,
          required: true,
         // options: this.catalogService.getOffices(),
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
