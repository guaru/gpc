import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {fields,options} from './restore-password.form';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Url } from '../../enums/Url';
import { Confirmation } from '../../models/confirmation.model';
import { User } from '../../models/user.model';

@Injectable()
export class RestorePasswordService {

  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model: Confirmation;
  private _invalidUser: boolean = false;
  private _msgInvalidUser: string;
  public _user!: User;






  constructor(
      public authService: AuthService,
      public router:Router
     ) {

    this._form  = new FormGroup({});
    this._fields = fields;
    this._fields.find(_ => _.key ==='confirmPassword')!.validators = {
      fieldMatch: {
        expression: (control: any) => control.value === this._model.password,
        message: 'La contraseña no coincide',
      }
    };
    this._fields.find(_ => _.key ==='confirmPassword')!.expressionProperties= {
      'templateOptions.disabled': () => !this._form.get('password')!.valid,
    };

    this._options =  options;
    this._model =  new Confirmation();
    this._msgInvalidUser = 'Usuario o contraseña incorrectos';

  }

  public validateRecover(username: string | null | undefined, password: string | null | undefined) {
    this.authService.validateRecover(username,password).subscribe( response =>{
      this._invalidUser = false;
      if(response.success){
        this._user = response.user;
        this._model.userName = response.user.userName;
        this._model.password = '';
        this._model.confirmationPassword = '';
      }else{
        this._msgInvalidUser = response.message;
        this._invalidUser = true;
      }
    },error =>{
        this._invalidUser = true;
    });
  }
  


  async restorestorePasswordre(){
    
    this.authService.restorePassword(this._model.userName,this._model.password,this._user.id).subscribe( async(response)=>{
      this.login();
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
