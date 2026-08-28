import { Injectable } from '@angular/core';
import { TASKS_MOCK } from '../mocks';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly tasks$ = of(TASKS_MOCK);
}
