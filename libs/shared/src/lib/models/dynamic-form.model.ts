import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export type FieldTypes = 'email' | 'password' | 'custom';

export type ValidatorsType = {
  email?: boolean;
  minLength?: number;
  required?: boolean;
  custom?: ValidatorFn[];
};

export interface IFormFieldConfig {
  name: string;
  type: FieldTypes;
  defaultValue: any;
  isCollection?: boolean;
  fields: IFormFieldConfig[][];
  validators?: ValidatorsType;
}

export interface IFormSchemaConfig {
  fields: IFormFieldConfig[];
}

export interface IDynamicFormFactory {
  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T>;
}
