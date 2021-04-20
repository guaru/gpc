import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {fields,options} from './login.form';
import { Login } from '../../models/login.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Url } from '../../enums/Url';
import { Role } from '../../enums/Role';

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


  async  login(){
    this.authService.loginAuth(this._model.userName || '',this._model.password || '').subscribe( async(response)=>{
        this._invalidUser = false;
        const isSave =  await this.authService.saveUser(response);
        if(isSave)
           this.redirect();

      },error =>{
              this._invalidUser = true;
      });
  }

  private redirect():void {
      if(this.authService.hasRole(Role.ROLE_ADMIN))
         this.router.navigate([`${Url.ADMINISTRADOR }/${Url.SUCURSALES}`]);
      else if (this.authService.hasRole(Role.ROLE_ADMIN_OFFICE))
         this.router.navigate([`${Url.SUCURSAL}/${Url.CONFIGURACION}`]);
      else if (this.authService.hasRole(Role.ROLE_OPERATOR))
         this.router.navigate([Url.TURNADOR]);
  }

  public get invalidUser(): boolean {
    return this._invalidUser;
  }


  public get msgInvalidUser(): string {
    return this._msgInvalidUser;
  }





}
