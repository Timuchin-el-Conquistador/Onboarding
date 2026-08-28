import { Injectable } from '@angular/core';
import { TASKS_MOCK } from '../mocks';
import { Observable, of } from 'rxjs';
import { ITask } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly tasks$: Observable<ITask[]> = of(TASKS_MOCK);
}
