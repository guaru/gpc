import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { Label } from 'src/app/core/enums/Label';
import { IUserForm } from 'src/app/core/interface/IUserForm';
import { Authoritie } from 'src/app/core/models/authorite.model';
import { Office } from 'src/app/core/models/office.model';
import { User } from 'src/app/core/models/user.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { CatalogHttpService } from 'src/app/core/services/catalog-http.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { UserHttpService } from '../user-http.service';
import { fields as FORM_FIELDS} from './user.form';
/**
 * SERVER LOGIC FOR COMPONENT USER FORM
 * @author Alejandro Ventura
 * @since 09-03-2021
 */
@Injectable()
export class UserFormService {

  public _form: FormGroup;
  public _fields!: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model!: IUserForm;
  public _title:string = "Usuario";

  constructor(
    private alertService:AlertService,
    private loadingService:SpinnerService,
    private catalogService:CatalogHttpService,
    private userHttpService:UserHttpService

  ) {
     this._form =  new FormGroup({});
     this._options  = {};

   }

   public save():Promise<User|null>{
      return new Promise(resolve=>{
        if(this._form.valid){
          this.loadingService.initLoading();
         this.userHttpService.save(this.getModel()).subscribe(async data=>{
              this.loadingService.endLoading();
              await this.alertService.success();
              resolve(data);
          },error=>{
               this.loadingService.endLoading();
               this.alertService.error();
              resolve(null);
          });
        }else
            resolve(null);
      });
   }



   public setModel(user:User)
   {
      this._model = Object.assign({},user) as IUserForm;
      this._model.office =  user.office?.id;
      this._model.authorities =  user.authorities?.map(_=> {
           return _.id||'';
      });
   }

   public getModel():User{
      this._model.userName = this._model.email;//NOTA: EL USERNAME SIEMPRE SERA EL CORREO ELECTRÓNICO DEL USUARIO
      let user = new User();
      user = Object.assign({},this._model) as User;
      user.office =  new Office(this._model.office);
      user.authorities = this._model.authorities?.map( (_:string)=>{
        return new Authoritie(_);
     });
      return user;
   }


  public buildFields() {
    this._fields = FORM_FIELDS;
    this._fields[0].fieldGroup!.find(_ => _.key ==='authorities')!.templateOptions!.options = this.catalogService.getAutorithies();
    this._fields[0].fieldGroup!.find(_ => _.key === 'office')!.templateOptions!.options = this.catalogService.getOffices();
  }




}
