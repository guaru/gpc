import { FormlyFieldConfig } from "@ngx-formly/core";
import { Label } from "src/app/core/enums/Label";

export class TurnFurm
{
  private _areas:any[];

  constructor(areas:any[])
  {
    this._areas = areas;
  }

  public buildFields(): FormlyFieldConfig[]
  {
    return  [
    {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'areaId',
            type: 'select',
            templateOptions: {
              label: Label.AREA,
              description: '',
              required: true,
              options: this._areas
            },
          },
          {
            className: 'col-12',
            type: 'input',
            key: 'phone',
            templateOptions: {
              label: Label.PHONE,
              maxLength: 10,
              minLength: 10,
              type: 'tel'
            }
          },

        ]
    }

    ];
  }
}
