import { ThrowStmt } from '@angular/compiler';
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
import { UserHttpService } from '../../../administrator/users/user-http.service';
import { UserForm} from './user.form';
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
  private offices: any[] = [];

  constructor(
    private alertService:AlertService,
    private loadingService:SpinnerService,
    private catalogService:CatalogHttpService,
    private userHttpService:UserHttpService

  ) {
     this._form =  new FormGroup({});
     this._options  = {};
     this.loadingService.initLoading();
    this.catalogService.getOffices().subscribe(data=>{
        this.offices =  data;
        this.loadingService.endLoading();
    },error=>{
         this.loadingService.endLoading();
         this.alertService.error();
    });
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

   exist():Promise<boolean|null>{
    return new Promise((resolve) => {
      if (this._form.valid) {
        this.loadingService.initLoading();
        this.userHttpService.exist(this._model.email,this._model.id).subscribe(async (data:any) => {
          this.loadingService.endLoading();
          if(data.error){
            this.alertService.error(data.message);
          }
          resolve(!data.error);
          
          
        }, error => {
          this.loadingService.endLoading();
          this.alertService.error();
          resolve(null);
        });
      }
    });
  }



   public setModel(user:User)
   {
      this._model = Object.assign({},user) as IUserForm;
      this._model.office = user.id ? {value: user.office?.id, label: user.office?.key + ' - ' + user.office?.name} : '';
      this._model.authorities =  user.authorities?.map(_=> {
           return _.id||'';
      });
   }

   public getModel():User{
      this._model.userName = this._model.email;//NOTA: EL USERNAME SIEMPRE SERA EL CORREO ELECTRÓNICO DEL USUARIO
      let user = new User();
      user = Object.assign({},this._model) as User;
      user.office =  new Office(this._model.office.value);
      user.authorities = this._model.authorities?.map( (_:string)=>{
        return new Authoritie(_);
     });
      return user;
   }


  public buildFields(operator:boolean,officeId:string) {
    let userForm =  new UserForm(this.catalogService.getAutorithies()
                        ,this.catalogService.getOffices(),operator,officeId);
    this._fields =  userForm.buildFields();
    this._fields[0].fieldGroup!.find(_ => _.key === 'office')!.templateOptions!.filter = (term: any) => of(term ? this.filterStates(term) : this.offices.slice());

  }

  filterStates(name: any) {
    return this.offices.filter(state =>
      state.label.toLowerCase().indexOf(name instanceof Object ? name.label : name.toLowerCase()) === 0);
  }

}
