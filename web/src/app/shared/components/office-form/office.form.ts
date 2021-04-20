import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { Label } from "src/app/core/enums/Label";


export class OfficeForm {

  private _fields: FormlyFieldConfig[];
  private _modConfiguration: boolean = false;
  private _states: any[];
  private _areas: any[];
  private _days:  any[];

  constructor(modConfiguration: boolean, states: any[], areas: any[],days:any[]) {
    this._modConfiguration = modConfiguration;
    this._states =  states;
    this._areas = areas;
    this._days =  days;
    this._fields = [];
  }


  buildFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'name',
            type: 'input',
            focus: true,
            hide: this._modConfiguration,
            templateOptions: {
              label: Label.NAME,
              description: '',
              required: true,
              maxLength: 50,
              readonly: this._modConfiguration
            }
          },
          {
            className: 'col-6',
            key: 'key',
            type: 'input',
            hide: this._modConfiguration,
            templateOptions: {
              label: Label.KEY,
              description: '',
              required: true,
              maxLength: 5,
              readonly: this._modConfiguration
            },

          },
          {
            className: 'col-6',
            key: 'state',
            type: 'select',
            hide: this._modConfiguration,
            templateOptions: {
              label: Label.STATE,
              placeholder: 'Seleccione estado',
              description: '',
              required: true,
              readonly: this._modConfiguration,
              options:  this._states
            },

          },
          {
            className: 'col-6',
            key: 'areas',
            type: 'select',
            templateOptions: {
              label: Label.AREA_OPERATION,
              description: '',
              required: true,
              multiple: true,
              options: this._areas
            },

          },
          {
            className: 'col-6',
            key: 'daysOperation',
            type: 'select',
            templateOptions: {
              label: Label.DAYS_OPERATION,
              description: '',
              required: true,
              multiple: true,
              options: this._days
            },

          },
          {
            className: 'col-2',
            key: 'initTimeAttention',
            type: 'input',
            templateOptions: {
              type:"time",
              label: Label.INIT_TIME_OPERATION,
              description: '',
              required: true,
            },

          },
          {
            className: 'col-2',
            key: 'endTimeAttention',
            type: 'input',
            templateOptions: {
              type: "time",
              label: Label.END_TIME_OPERATION,
              description: '',
              required: true,
            },

          },
          {
            className: 'col-12',
            key: 'address',
            type: 'textarea',
            hide: this._modConfiguration,
            templateOptions: {
              label: Label.ADDRESS,
              description: '',
              required: true,
              maxLength: 150,
              minRows: 2,
              maxRows: 5,
              autosize: true,
              readonly: this._modConfiguration,
            },
          },
          {
            className: 'col-3',
            key: "notificationNext",
            type: 'input',
            templateOptions: {
              type:"number",
              label: 'Notificación turnos proximos',
              required: true,
              min:1,
              max:20,
              description: '',

            },
          },
          {
            className: 'col-3',
            key: "enabled",
            type: 'toggle',
            hide: this._modConfiguration,
            templateOptions: {
              label: 'Activa',
              description: '',
              readonly: this._modConfiguration,
            },
          },
        ]
      },
    ];

  }

}


