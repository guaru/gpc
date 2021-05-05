import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";


export let options: FormlyFormOptions = {};
export let fields: FormlyFieldConfig[] = [
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

  },
  {
    key: 'confirmationPassword',
    type: 'input',
    templateOptions: {
      label: 'Confirmar Contraseña',
      placeholder: 'Confirmar Contraseña',
      type:"password",
      description: '',
      required: true,
    }
  }
];
