import { ErrorHandler } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";

export function minlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Ingrese minimo ${field.templateOptions?.minLength} caracteres`;
}

export function maxlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Debe ingresar maximo ${field.templateOptions?.maxLength} 10 catacteres`;
}

export function minValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Valor minimo ${field.templateOptions?.min}`;
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Valor maximo ${field.templateOptions?.max}`;
}

