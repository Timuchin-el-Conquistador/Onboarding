import { inject, Injectable, signal } from '@angular/core';
import { debounceTime, Observable } from 'rxjs';
import {
  ToasterService,
  withLoading,
  withToaster,
} from '@org/my-lib/operators';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/my-lib/operators';
import { ITodo } from '../models';
import { TODO_SUCCESS_MESSAGES } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService {
  readonly loading = signal(false);
  readonly successMessage = signal('');

  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #toasterService = inject(ToasterService);

  getTodos(): Observable<ITodo[]> {
    return this.#http
      .get<ITodo[]>(this.#base_url + '/v1/todo')
      .pipe(
        withLoading(this.loading),
        withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.GET),
      );
  }

  createTodo(name: string): Observable<ITodo> {
    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo', { name })
      .pipe(
        debounceTime(200),
        withLoading(this.loading),
        withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.CREATE),
      );
  }

  removeTodo(id: string): Observable<unknown> {
    return this.#http
      .delete(this.#base_url + '/v1/todo', { params: { id } })
      .pipe(withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.DELETE));
  }
}
