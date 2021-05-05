import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Confirmation } from 'src/app/core/models/confirmation.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import {fields,options} from './change-password.form';
import { Url } from 'src/app/core/enums/Url';
import { Office } from 'src/app/core/models/office.model';

@Injectable()
export class ChangePasswordService {

  public recover: boolean = false;
  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model: Confirmation;
  private _invalidUser: boolean = false;
  private _msgInvalidUser: string;
  public _user: User = new User();
  public _office: Office = new Office();
  public _officeName: string = '';
  public _password: string = '';
  public _passwordConfirmation: string = '';

  constructor(
      public authService: AuthService,
      public router: Router
     ) {
      this._form  = new FormGroup({});
      this._fields = fields;
      this._fields.find(_ => _.key ==='confirmationPassword')!.validators = {
        fieldMatch: {
          expression: (control: any) => control.value === this._model.password,
          message: 'La contraseña no coincide',
        }
      };
      this._fields.find(_ => _.key ==='confirmationPassword')!.expressionProperties= {
        'templateOptions.disabled': () => !this._form.get('password')!.valid,
      };
  
      this._options =  options;
      this._model =  new Confirmation();
      this._model.password = '1234';
      this._model.confirmationPassword = '1234';
      this._msgInvalidUser = 'Usuario o contraseña incorrectos';
  }

  initForm(){
    this._form  = new FormGroup({});
    this._fields = fields;
    this._fields.find(_ => _.key ==='confirmationPassword')!.validators = {
      fieldMatch: {
        expression: (control: any) => control.value === this._model.password,
        message: 'La contraseña no coincide',
      }
    };
    this._fields.find(_ => _.key ==='confirmationPassword')!.expressionProperties= {
      'templateOptions.disabled': () => !this._form.get('password')!.valid,
    };

    this._options =  options;
    this._model =  new Confirmation();
    this._model.password = '1234';
    this._model.confirmationPassword = '1234';
    this._msgInvalidUser = 'Usuario o contraseña incorrectos';
  }

  async getUser(){
    this.authService.getUser().subscribe(response => {
      debugger;
      this._user = response;
      this._office = response.office;
      this._officeName = this._office.key +' - ' + this._office.name
    }, error => {
     });
  }

  async changePassword(){
    debugger;
    this.authService.changePassword(this._user.userName,this._model.password,this._user.id).subscribe( async(response)=>{
      this._form.reset();
      this.initForm();
    },error =>{
      this._invalidUser = true;
    });
  }

  login(){
    this.authService.loginAuth(this._model.userName || '',this._model.password || '').subscribe( async(response)=>{
      this._invalidUser = false;
      const isSave =  await this.authService.saveUser(response);
      if(isSave)
        this.router.navigate([Url.ADMINISTRADOR]);

    },error =>{
            this._invalidUser = true;
    });
  }

  public get invalidUser(): boolean {
    return this._invalidUser;
  }


  public get msgInvalidUser(): string {
    return this._msgInvalidUser;
  }



}
