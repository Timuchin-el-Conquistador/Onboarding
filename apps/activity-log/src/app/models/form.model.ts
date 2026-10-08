import { FormControl } from '@angular/forms';
import { IFormSchemaConfig } from '@org/shared';

export const FORM: IFormSchemaConfig = {
  fields: [
    {
      name: 'pagination',
      type: 'custom',
      defaultValue: { page: 1, pageSize: 25 },
      fields: [],
    },
  ],
};

export interface IForm {
  pagination: FormControl<{
    page: number;
    pageSize: number;
  }>;
}
