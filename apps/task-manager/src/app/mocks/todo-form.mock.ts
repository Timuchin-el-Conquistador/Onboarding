import { IFormSchemaConfig } from '@org/my-lib/operators';

export const DEFAULT_TODO_FORM: IFormSchemaConfig = {
  fields: [
    {
      name: 'title',
      type: 'custom',
      defaultValue: '',
      validators: { required: true },
    },
  ],
};
