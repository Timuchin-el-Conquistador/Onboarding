import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  API_URL_TOKEN,
  ToasterService,
  withToaster,
} from '@org/my-lib/operators';
import { ITodo, IEditTask } from '../models';
import { TASK_SUCCESS_MESSAGES } from '../types';
import { TodoManagerService } from './todo-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #toasterService = inject(ToasterService);
  readonly #todoManager = inject(TodoManagerService);

  createTask(id: string, name: string): Observable<ITodo> {
    const params = new HttpParams().set('id', id);

    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo/task', { name }, { params })
      .pipe(
        tap(() => this.#todoManager.refreshTodos()),
        withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.CREATE),
      );
  }

  updateTask(
    task: IEditTask,
    todoId: string,
    taskId: string,
  ): Observable<ITodo> {
    const params = new HttpParams().set('id', todoId).set('task-id', taskId);

    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo/edit-task', task, {
        params,
      })
      .pipe(
        tap(() => this.#todoManager.refreshTodos()),
        withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.UPDATE),
      );
  }

  removeTask(todoId: string, taskId: string): Observable<ITodo> {
    const params = new HttpParams().set('id', todoId).set('task-id', taskId);

    return this.#http
      .delete<ITodo>(this.#base_url + '/v1/todo/task', {
        params,
      })
      .pipe(
        tap(() => this.#todoManager.refreshTodos()),
        withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.DELETE),
      );
  }
}
