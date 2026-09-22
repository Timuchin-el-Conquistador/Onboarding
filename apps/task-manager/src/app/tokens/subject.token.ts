import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const SUBJECT_TOKEN = new InjectionToken<Subject<boolean>>(
  'SUBJECt_TOKEN',
  {
    factory() {
      return new Subject<boolean>();
    },
  },
);
