import { InjectionToken, inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { DynamicFormFactory } from './dynamic-form.factory';

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
  defaultValue: string;
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

export const DYNAMIC_FORM_FACTORY = new InjectionToken<IDynamicFormFactory>(
  'DYNAMIC_FORM_FACTORY',
  {
    factory: () => inject(DynamicFormFactory),
  },
);
