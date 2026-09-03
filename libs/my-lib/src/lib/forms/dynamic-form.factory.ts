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
} from './dynamic-form.models';

@Injectable({ providedIn: 'root' })
export class DynamicFormFactory implements IDynamicFormFactory {
  readonly #fb = inject(NonNullableFormBuilder);

  createForm<T extends { [K in keyof T]: AbstractControl }>(
    schema: IFormSchemaConfig,
  ): FormGroup<T> {
    const fields: Record<string, AbstractControl> = {};

    for (const field of schema.fields) {
      if (field.isCollection) {
        fields[field.name] = this.#createArray(field);
        continue;
      }
      fields[field.name] = this.#createControl(field);
    }

    return this.#fb.group(fields) as unknown as FormGroup<T>;
  }

  #createGroup(field: IFormFieldConfig): FormGroup {
    const fields: Record<string, AbstractControl> = {};

    for (const child of field.children) {
      fields[child.name] = child.isCollection
        ? this.#createArray(child)
        : this.#createControl(child);
    }

    return this.#fb.group(fields);
  }

  #createArray(field: IFormFieldConfig): FormArray {
    return this.#fb.array(field.children.map(() => this.#createGroup(field)));
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
