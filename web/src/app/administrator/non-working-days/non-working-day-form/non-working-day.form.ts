import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { Observable } from "rxjs";
import { Label } from "src/app/core/enums/Label";
import { NonWorkingDay } from "src/app/core/models/non-working-day.model";


export class NonWorkingDayForm
{
  private _fields: FormlyFieldConfig[];
  private _months: any[];
  private _days: any[];

  constructor(months:any[],days:any[]){
    this._fields = [];
    this._months =  months;
    this._days =  days;
  }

  public buildFields(): FormlyFieldConfig[]
  {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'month',
            type: 'select',
            //defaultValue: this._operator ? ["1"] : [''],
            templateOptions: {
              label: Label.MONTH,
              required: true,
               options: this._months
            },
          },
          {
            className: 'col-6',
            key: 'day',
            type: 'select',
            templateOptions: {
              label: Label.DAY,
              required: true,
              options: this._days
            },
          }
          , {
            className: 'col-3',
            key: "enabled",
            type: 'toggle',
            //defaultValue: nonWorkingDay ? nonWorkingDay.day : null,
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
