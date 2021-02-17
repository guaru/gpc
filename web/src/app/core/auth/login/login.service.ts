import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {fields,options} from './login.form';
import { Login } from '../../models/login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Url } from '../../enums/Url';

@Injectable()
export class LoginService {

  public recover: boolean = false;
  public _form: FormGroup;
  public _fields: FormlyFieldConfig[];
  public _options: FormlyFormOptions;
  public _model: Login;
  private _invalidUser: boolean = false;
  private _msgInvalidUser: string;






  constructor(
      public authService: AuthService,
      public router:Router
     ) {

    this._form  = new FormGroup({});
    this._fields = fields;
    this._options =  options;
    this._model =  new Login();
    this._msgInvalidUser = 'Usuario o contraseña incorrectos';

  }


  public login(){
    this.authService.loginAuth(this._model.userName || '',this._model.password || '').subscribe(response=>{
        this._invalidUser = false;
        this.authService.saveUser(response);
        this.router.navigate([Url.HOME]);
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
