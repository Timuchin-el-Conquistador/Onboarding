import { inject, Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { withCondition, withToaster } from '@org/my-lib/operators';
import { ToasterService } from '@org/my-lib/services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL_TOKEN, LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
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

  createTodo(name: string): Observable<ITodo> {
    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo', { name })
      .pipe(withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.CREATE));
  }

  removeTodo(id: string): Observable<unknown> {
    const params = new HttpParams().set('id', id);

    return this.#http
      .delete(this.#base_url + '/v1/todo', { params })
      .pipe(withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.DELETE));
  }
}
