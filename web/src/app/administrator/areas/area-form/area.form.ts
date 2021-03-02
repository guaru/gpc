import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";


export let options: FormlyFormOptions = {};
export let fields: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Nombre',
      placeholder: 'Nombre',
      description: '',
      required: true,
      maxLength:50
    }
  },

  {
    key: 'key',
    type: 'input',
    templateOptions: {
      label: 'Clave',
      placeholder: 'Clave',
      description: '',
      required: true,
      maxLength:4
    },

  },{
    key:"enabled",
    type: 'toggle',
    templateOptions: {
      label: 'Activa',
      description: '',
    },
  }


];
