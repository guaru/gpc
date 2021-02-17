import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalConstantsService } from './global-constants.service';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private globalConstantsService:GlobalConstantsService) {
  }

  public info(msg?: string) {
    return  Swal.fire({
       title:'',
       text:msg,
       icon:'info',
       confirmButtonText:"Enterado",
       buttonsStyling: false,
       customClass: {
         confirmButton: "btn btn-outline-danger"
       }
    });
  }

 public  success(msg?: string)
 {
    msg = msg ? msg : this.globalConstantsService.MSG_SUCCES_DEFAULT;
   return Swal.fire({
     title: 'Listo',
     text: msg,
     icon: 'success',
     confirmButtonText: "Enterado",
     buttonsStyling: false,
     customClass: {
       confirmButton: "btn btn-outline-danger"
     }
   });
 }



 public confirm(msg?:string):Promise<boolean>{
    msg = msg ? msg : this.globalConstantsService.MSG_SUCCES_DEFAULT;
    return new Promise((resolve)=>{
      Swal.fire({
        title: '¿Está seguro?',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si.',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
           resolve(false);
        }
      })
    });

  }



}
