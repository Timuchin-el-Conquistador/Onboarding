import { Injectable, signal } from '@angular/core';
import { TODO_LISTS_MOCK } from '../mocks';
import { ITodoList } from '../models';
import { delay, Observable, of } from 'rxjs';
import { withLoading } from '@org/my-lib/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {
  readonly loading = signal(false);

  readonly #tasks = of(TODO_LISTS_MOCK);

  getTasks(): Observable<ITodoList[]> {
    return this.#tasks.pipe(delay(2000), withLoading(this.loading));
  }
}
