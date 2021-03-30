import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NonWorkingDayForm } from './non-working-day.form';
import { NonWorkingDay } from 'src/app/core/models/non-working-day.model';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { NonWorkingDayHttpService } from '../non-working-day-http.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { map, startWith, tap } from 'rxjs/operators';

@Injectable()
export class NonWorkingDayFormService {
  public _form: FormGroup;
  public _fields!: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: NonWorkingDay;
  public _title:string = 'Día Inhábil';

  constructor(public loadService:SpinnerService,
     private alertService: AlertService,
     private nonWorkingDayHttpService:NonWorkingDayHttpService,
     private catalogService:CatalogHttpService,) {
      this._form =  new FormGroup({});
      this._options  = {};
  }

  save():Promise<NonWorkingDay|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadService.initLoading();
        this.nonWorkingDayHttpService.save(this._model).subscribe(async (data:NonWorkingDay) => {
          this.loadService.endLoading();
          await  this.alertService.success();
          resolve(data);
        }, error => {
          this.loadService.endLoading();
          this.alertService.error();
          resolve(null);
        });
      }
    });
  }

  exist():Promise<boolean|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadService.initLoading();
        this.nonWorkingDayHttpService.exist(this._model.month,this._model.day,this._model.id).subscribe(async (data:any) => {
          this.loadService.endLoading();
          if(data.error){
            this.alertService.error(data.message);
          }
          resolve(!data.error);
          
          
        }, error => {
          this.loadService.endLoading();
          this.alertService.error();
          resolve(null);
        });
      }
    });
  }

  public buildFields() {
    let noWorkingDayForm =  new NonWorkingDayForm(this.catalogService.getMonths(),[]);
    this._fields =  noWorkingDayForm.buildFields();

    this._fields[0].fieldGroup!.find(_ => _.key === 'day')!. hooks = {
      onInit: field => {
        const teamControl = this._form.get('month');
        field!.templateOptions!.options = teamControl!.valueChanges.pipe(
          startWith(teamControl!.value),
          map(month => this.getDaysInMonth(month)),
          //tap(() => field!.formControl!.setValue(null)),
        );
      },
    };

  }

  getDaysInMonth(month: number) {
    let date = new Date(new Date().getFullYear(), month, 1);
    let days: any[] = [];
    while (date.getMonth() == month) {
      days.push({label: date.getDate(), value: date.getDate() });
      date.setDate(date.getDate() + 1);
    }

    if(month == 1 && days.length == 28){
      days.push({label: 29, value: 29 });
    }

    return days;
  }


}
