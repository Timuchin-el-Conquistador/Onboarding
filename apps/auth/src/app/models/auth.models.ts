import { FormControl } from '@angular/forms';
import { IFormSchemaConfig } from './dynamic-form.models';

export interface IAuthForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export const CREDENTIALS_FORM_CONFIG: IFormSchemaConfig = {
  fields: [
    {
      name: 'email',
      type: 'email',
      defaultValue: '',
      validators: { required: true },
    },
    {
      name: 'password',
      type: 'password',
      defaultValue: '',
      validators: { required: true, minLength: 8 },
    },
  ],
};
