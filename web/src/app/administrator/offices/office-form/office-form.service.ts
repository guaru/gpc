import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Area } from 'src/app/core/models/area.model';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { OfficeHttpService } from '../office-http.service';
import { Office } from 'src/app/core/models/office.model';
import { fields as FORM_FIELDS } from './office.form';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { State } from 'src/app/core/models/state.model';
import { IOfficeForm } from 'src/app/core/interface/IOfficeForm';

@Injectable()
export class OfficeFormService {
  public _form: FormGroup;
  public _fields!: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: IOfficeForm;
  public _title:string = 'Sucursal';

  constructor(public loadService:SpinnerService,
     private alertService: AlertService,
     private catalogService:CatalogHttpService,
     private officeHttpService: OfficeHttpService) {
    this._form =  new FormGroup({});
     this._options  = {};
  }

  save():Promise<Office|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadService.initLoading();
        this.officeHttpService.save(this.getModel()).subscribe((data:Office) => {
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

  public setModel(office:Office)
  {
    this._model = Object.assign({},office) as IOfficeForm;
    this._model.state =  office.state?.id;
    this._model.areas =  office.areas?.map(_=> {
          return _.id||'';
    });
  }

  public getModel():Office{ 
    let office = new Office();
      office = Object.assign({},this._model) as Office;
      office.state =  new State(this._model.state);
      office.areas = this._model.areas?.map( (_:string)=>{
      return new Area(_);
   });
    return office;
 }

  public buildFields() {
    this._fields = FORM_FIELDS;
    this._fields[0].fieldGroup!.find(_ => _.key ==='state')!.templateOptions!.options = this.catalogService.getStates();
    this._fields[0].fieldGroup!.find(_ => _.key === 'areas')!.templateOptions!.options = this.catalogService.getAreas();
  }


}
