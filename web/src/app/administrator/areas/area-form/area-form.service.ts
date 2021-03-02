import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { fields, options } from './area.form';
import { Area } from 'src/app/core/models/area.model';

@Injectable()
export class AreaFormService {
  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model: Area;

  constructor() {

    this._form = new FormGroup({});
    this._fields = fields;
    this._options = options;
    this._model = new Area();
  }
}
