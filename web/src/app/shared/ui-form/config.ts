import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { ConfigOption } from "@ngx-formly/core";
import {
  maxlengthValidationMessage,
  maxValidationMessage,
  minlengthValidationMessage,
  minValidationMessage
} from './helpers/validations-messages';


const appearance: MatFormFieldDefaultOptions = {
  appearance: "standard"
};


export const config: ConfigOption = {
  validationMessages: [
    { name: 'required', message: 'El campo es requerido' },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage },
    { name: 'maximumMoneyValidation', message: 'should be 100' }
  ],
  validators : [

  ]
};

export const providerFormly = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: appearance
};
