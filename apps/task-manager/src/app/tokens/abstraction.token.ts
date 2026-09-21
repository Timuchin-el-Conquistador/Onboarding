import { InjectionToken } from '@angular/core';
import { ITodo } from '../models';
import { BaseResourceManagerService } from '../services';

export const ABSTRACTION_TOKEN = new InjectionToken<
  BaseResourceManagerService<ITodo>
>('ServiceAbstraction');
