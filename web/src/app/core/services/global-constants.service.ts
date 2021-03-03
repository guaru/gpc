import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {

  public  APP_NAME:string = 'GPC';
  public  LOGO_ICON:string = '../assets/images/logo-icon.png';
  public  LOGO_TEXT: string = '...';
  public  LOGO_LIGTH_ICON:string = '../assets/images/logo-light-icon.png';
  public  LOGO_LIGHT_TEXT: string = '...';
  public  MSG_SUCCES_DEFAULT:string = 'Acción finalizada con exito';
  public  MSG_ERROR_DEFAULT: string = 'Algo  salio mal, intente  de nuevo por favor';
  public  MSG_CONFIRM_DEFAULT: string = '¿Está seguro desea continuar?';
  public  PAGE_SIZE : number = 6;

  constructor() {

    console.log("load init service global");

   }
}
