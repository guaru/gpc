import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";


export let options: FormlyFormOptions = {};
export let fields: FormlyFieldConfig[] = [
  {
    key: 'userName',
    type: 'input',
    templateOptions: {
      label: 'Usuario',
      placeholder: 'usuario',
      description: '',
      required: true
    }
  },

  {
    key: 'password',
    type: 'input',
    templateOptions: {
      label: 'Contraseña',
      placeholder: 'Contraseña',
      type:"password",
      description: '',
      required: true,
    },

  }
];
