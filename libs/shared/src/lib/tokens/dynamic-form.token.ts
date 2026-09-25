import { inject, InjectionToken } from '@angular/core';
import { DynamicFormFactory } from '../forms/dynamic-form.factory';
import { IDynamicFormFactory } from '../models';

export const DYNAMIC_FORM_FACTORY = new InjectionToken<IDynamicFormFactory>(
  'DYNAMIC_FORM_FACTORY',
  {
    factory: () => inject(DynamicFormFactory),
  },
);
