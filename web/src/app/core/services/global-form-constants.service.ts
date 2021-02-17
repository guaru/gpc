import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalFormConstantsService {

  public SUBMIT:string = 'Guardar';
  public CANCEL:string = 'Cancelar';
  public DELETE:string = 'Eliminar';

  constructor() {

  }
}
