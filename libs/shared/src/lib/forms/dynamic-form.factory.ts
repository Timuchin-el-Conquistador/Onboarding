import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import {
  IFormFieldConfig,
  IDynamicFormFactory,
  IFormSchemaConfig,
} from '../models/dynamic-form.model';

@Injectable({ providedIn: 'root' })
export class DynamicFormFactory implements IDynamicFormFactory {
  readonly #fb = inject(NonNullableFormBuilder);

  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T> {
    const controls: Record<string, AbstractControl> = {};

    for (const field of schema.fields) {
      controls[field.name] = field.isCollection
        ? this.#createArray(field.fields)
        : this.#createControl(field);
    }

    return this.#fb.group(controls) as unknown as FormGroup<T>;
  }

  #createArray(fields: IFormFieldConfig[][]): FormArray {
    return this.#fb.array(
      fields.map((field) => this.createForm({ fields: field })),
    );
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

    if (field.validators?.custom) {
      validators.push(...field.validators?.custom);
    }

    return validators;
  }
}
