import { IFormSchemaConfig } from '@org/shared/models';

export const DEFAULT_TODO_FORM: IFormSchemaConfig = {
  fields: [
    {
      name: 'todo',
      type: 'custom',
      isCollection: true,
      defaultValue: '',
      validators: {
        required: true,
      },
      fields: [],
    },
  ],
};
