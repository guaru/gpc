import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { fields, options } from './area.form';
import { Area } from 'src/app/core/models/area.model';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AreaHttpService } from '../area-http.service';

@Injectable()
export class AreaFormService {
  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: Area;
  public _title:string = 'Area';

  constructor(public loadService:SpinnerService,
     private alertService: AlertService,
     private areaHttpService:AreaHttpService) {
    this._form = new FormGroup({});
    this._fields = fields;
    this._options = options;
  }

  save():Promise<Area|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadService.initLoading();
        this.areaHttpService.save(this._model).subscribe(async (data:Area) => {
          this.loadService.endLoading();
          await  this.alertService.success();
          resolve(data);
        }, error => {
          this.loadService.endLoading();
          this.alertService.error();
          resolve(null);
        });
      }
    })

  }


}
