import { ErrorHandler } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";

export function minlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Should have at least ${field.templateOptions?.minLength} characters`;
}

export function maxlengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions?.maxLength} characters`;
}

export function minValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be more than ${field.templateOptions?.min}`;
}

export function maxValidationMessage(err: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.templateOptions?.max}`;
}
