import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";


export let options: FormlyFormOptions = {};
export let fields: FormlyFieldConfig[] = [
  {
    key: 'name',
    type: 'input',
    focus: true,
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

  },
  {
    key: 'state',
    type: 'select',
    templateOptions: {
      label: 'Estado',
      placeholder: 'Seleccione estado',
      description: '',
      required: true,
      options: [],
        valueProp: 'id',
        labelProp: 'name'
    },

  },
  {
    key: 'state',
    type: 'select',
    templateOptions: {
      label: 'Estado',
      placeholder: 'Seleccione estado',
      description: '',
      required: true,
      options: [],
        valueProp: 'id',
        labelProp: 'name'
    },

  },
  {
    key:"enabled",
    type: 'toggle',
    templateOptions: {
      label: 'Activa',
      description: '',
    },
  }


];
