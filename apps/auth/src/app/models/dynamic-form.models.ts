import {
  AbstractControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { inject, InjectionToken } from '@angular/core';
import { CredentialsFormFactory } from '../forms/dynamic-form.factory';

export type FieldType = 'email' | 'password' | 'text' | 'checkbox';

export interface IFieldConfig {
  name: string;
  type: FieldType;
  defaultValue?: unknown;
  validators?: {
    required?: boolean;
    minLength?: number;
    email?: boolean;
    custom?: ValidatorFn[];
  };
}

export interface IFormSchemaConfig {
  fields: IFieldConfig[];
}

export interface IAuthFormFactory {
  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T>;
}

export const DYNAMIC_FORM_FACTORY = new InjectionToken<IAuthFormFactory>(
  'DYNAMIC_FORM_FACTORY',
  {
    providedIn: 'root',
    factory: () => inject(CredentialsFormFactory),
  },
);
