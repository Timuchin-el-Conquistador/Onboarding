import { inject, Injectable, Injector } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { withCondition, withToaster } from '@org/my-lib/operators';
import { ToasterService } from '@org/my-lib/services';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import {
  API_URL_TOKEN,
  LOADER_INJECTOR,
  LOADER_MANAGER_SERVICE,
} from '@org/shared/tokens';
import { withLoading } from '@org/shared/operators';
import { ITodo } from '../models';
import { TODO_SUCCESS_MESSAGES } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {
  readonly loadingManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly #refreshTodos$ = new Subject<boolean>();
  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #toasterService = inject(ToasterService);

  todos$: Observable<ITodo[]> = this.#refreshTodos$.pipe(
    switchMap((initial: boolean) =>
      this.#http
        .get<ITodo[]>(this.#base_url + '/v1/todo')
        .pipe(
          withCondition(initial, [
            withLoading(this.loadingManagerService),
            withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.GET),
          ]),
        ),
    ),
  );

  refreshTodos(initial: boolean = false): void {
    this.#refreshTodos$.next(initial);
  }

  createTodo(name: string, injector: Injector): Observable<ITodo> {
    const context = new HttpContext().set(LOADER_INJECTOR, injector);
    
    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo', { name }, { context })
      .pipe(withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.CREATE));
  }

  removeTodo(id: string, injector: Injector): Observable<unknown> {
    const params = new HttpParams().set('id', id);
    const context = new HttpContext().set(LOADER_INJECTOR, injector);

    return this.#http
      .delete(this.#base_url + '/v1/todo', { params, context })
      .pipe(withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.DELETE));
  }
}
