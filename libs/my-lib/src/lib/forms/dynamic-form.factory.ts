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
  IFormFieldConfig,
  IDynamicFormFactory,
  IFormSchemaConfig,
} from './dynamic-form.models';

@Injectable({ providedIn: 'root' })
export class DynamicFormFactory implements IDynamicFormFactory {
  readonly #fb = inject(FormBuilder);

  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T> {
    const controls: Record<string, AbstractControl> = {};

    for (const field of schema.fields) {
      controls[field.name] = this.#createControl(field);
    }

    return this.#fb.group(controls) as unknown as FormGroup<T>;
  }

  #createControl(field: IFormFieldConfig): FormControl {
    return this.#fb.control(
      field.defaultValue,
      this.#resolveValidatorsfield(field),
    );
  }

  #resolveValidatorsfield(field: IFormFieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (field.validators?.required) {
      validators.push(Validators.required);
    }
    if (field.validators?.email) {
      validators.push(Validators.email);
    }
    if (field.validators?.minLength) {
      validators.push(Validators.minLength(field.validators.minLength));
    }

    return validators;
  }
}
