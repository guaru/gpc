import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Area } from 'src/app/core/models/area.model';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/core/services/alert.service';
import { OfficeHttpService } from '../office-http.service';
import { Office } from 'src/app/core/models/office.model';
import { fields, options } from './office.form';

@Injectable()
export class OfficeFormService {
  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: Office;
  public _title:string = 'Sucursal';

  constructor(public loadService:SpinnerService,
     private alertService: AlertService,
     private officeHttpService: OfficeHttpService) {
    this._form = new FormGroup({});
    this._fields = fields;
    this._options = options;
  }

  save():Promise<Office|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadService.initLoading();
        this.officeHttpService.save(this._model).subscribe((data:Office) => {
          this.loadService.endLoading();
          this.alertService.success();
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
