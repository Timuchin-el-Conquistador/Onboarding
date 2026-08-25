import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import {
  IAuthFormFactory,
  IFieldConfig,
  FieldType,
  IFormSchemaConfig,
} from '../models/dynamic-form.models';

@Injectable({ providedIn: 'root' })
export class CredentialsFormFactory implements IAuthFormFactory {
  readonly #formBuilder = inject(FormBuilder);

  readonly #defaultValidatorsByType: Record<FieldType, ValidatorFn[]> = {
    email: [Validators.email],
    password: [],
    text: [],
    checkbox: [],
  };

  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T> {
    const controls: Record<string, FormControl> = {};

    for (const field of schema.fields) {
      controls[field.name] = this.#createControl(field);
    }

    return this.#formBuilder.group(controls) as unknown as FormGroup<T>;
  }

  #createControl(field: IFieldConfig): FormControl {
    const validators = this.#resolveValidators(field),
      initialValue = field.defaultValue ?? '';

    return this.#formBuilder.control(initialValue, { validators });
  }

  #resolveValidators(field: IFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (this.#defaultValidatorsByType[field.type]) {
      validators.push(...this.#defaultValidatorsByType[field.type]);
    }

    if (field.validators) {
      const { required, minLength, email, custom } = field.validators;

      if (required) {
        validators.push(Validators.required);
      }
      if (email && field.type !== 'email') {
        validators.push(Validators.email);
      }
      if (typeof minLength === 'number') {
        validators.push(Validators.minLength(minLength));
      }
      if (custom?.length) {
        validators.push(...custom);
      }
    }

    return validators;
  }
}
