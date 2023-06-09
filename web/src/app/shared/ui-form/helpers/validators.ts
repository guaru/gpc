import { FormControl } from "@angular/forms";

export function maximumMoneyValidation(control:any, type:any) {
  const value = control.value;

  if (value) {
    const unMasked = parseInt(value.replace(/\D/g, ''));

    if (unMasked > 10000) {
      return { maximumMoneyValidation: 'Should be bellow 10.000' };
    }
  }

  return null;
}

export function emailValidation(control:any,type:any){
  return !control.value || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(control.value) ? null : { 'email':true}
}

