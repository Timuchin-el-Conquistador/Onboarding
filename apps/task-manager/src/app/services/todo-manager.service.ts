import { Injectable } from '@angular/core';
import { TASKS_MOCK } from '../mocks';
import { ITask } from '../models';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {
  readonly #tasks = of(TASKS_MOCK);

  getTasks(): Observable<ITask[]> {
    return this.#tasks.pipe(delay(2000));
  }
}
