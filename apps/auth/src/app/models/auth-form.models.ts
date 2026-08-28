import { FormControl } from '@angular/forms';
import { IFormSchemaConfig } from './dunamic-form.models';

export interface IAuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export const DEFAULT_AUTH_FORM: IFormSchemaConfig = {
  fields: [
    {
      name: 'email',
      type: 'email',
      defaultValue: '',
      validators: { email: true, required: true },
    },
    {
      name: 'password',
      type: 'password',
      defaultValue: '',
      validators: { required: true, minLength: 8 },
    },
  ],
};
