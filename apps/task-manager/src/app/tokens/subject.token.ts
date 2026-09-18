import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const TODO_RESOURCE_CHANGE_TOKEN = new InjectionToken<Subject<boolean>>(
  'TODO_RESOURCE_CHANGE_TOKEN',
  {
    factory() {
      return new Subject<boolean>();
    },
  },
);
