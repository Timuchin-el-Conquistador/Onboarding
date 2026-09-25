import { FormControl } from '@angular/forms';
import { IFormSchemaConfig } from '@org/shared';

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
      fields: [],
      validators: { email: true, required: true },
    },
    {
      name: 'password',
      type: 'password',
      defaultValue: '',
      fields: [],
      validators: { required: true, minLength: 8 },
    },
  ],
};
