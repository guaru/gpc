import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { Label } from "src/app/core/enums/Label";


export let fields: FormlyFieldConfig[]  = [
{
  fieldGroupClassName: 'row',
  fieldGroup: [
  {
    className: 'col-6',
    key: 'name',
    type: 'input',
    focus: true,
    templateOptions: {
      label: Label.NAME,
      description: '',
      required: true,
      maxLength:50
    }
  },
  {
    className: 'col-6',
    key: 'key',
    type: 'input',
    templateOptions: {
      label: Label.KEY,
      description: '',
      required: true,
      maxLength:5
    },

  },
  {
    className: 'col-6',
    key: 'state',
    type: 'select',
    templateOptions: {
      label: Label.STATE,
      placeholder: 'Seleccione estado',
      description: '',
      required: true
    },

  },
  {
    className: 'col-6',
    key: 'areas',
    type: 'select',
    templateOptions: {
      label: Label.AREA,
      description: '',
      required: true,
      multiple: true
    },

  },
  {
    className: 'col-12',
    key: 'address',
    type: 'textarea',
    templateOptions: {
      label: Label.ADDRESS,
      description: '',
      required: true,
      maxLength:150,
      minRows:2,
      maxRows:5
    },
  },
  {
    className: 'col-3',
    key:"enabled",
    type: 'toggle',
    templateOptions: {
      label: 'Activa',
      description: '',
    },
  }


  ]
}];
