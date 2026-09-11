import { inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { withToaster } from '@org/my-lib/operators';
import { ToasterService } from '@org/my-lib/services';
import { API_URL_TOKEN, LOADER_INJECTOR } from '@org/shared/tokens';
import { ITodo, IEditTask } from '../models';
import { TASK_SUCCESS_MESSAGES } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #toasterService = inject(ToasterService);

  createTask(id: string, name: string, injector: Injector): Observable<ITodo> {
    const params = new HttpParams().set('id', id);
    const context = new HttpContext().set(LOADER_INJECTOR, injector);

    return this.#http
      .post<ITodo>(
        this.#base_url + '/v1/todo/task',
        { name },
        { params, context },
      )
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.CREATE));
  }

  updateTask(
    task: IEditTask,
    todoId: string,
    taskId: string,
    injector: Injector,
  ): Observable<ITodo> {
    const params = new HttpParams().set('id', todoId).set('task-id', taskId);
    const context = new HttpContext().set(LOADER_INJECTOR, injector);

    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo/edit-task', task, {
        params,
        context,
      })
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.UPDATE));
  }

  removeTask(
    todoId: string,
    taskId: string,
    injector: Injector,
  ): Observable<ITodo> {
    const params = new HttpParams().set('id', todoId).set('task-id', taskId);
    const context = new HttpContext().set(LOADER_INJECTOR, injector);
    return this.#http
      .delete<ITodo>(this.#base_url + '/v1/todo/task', {
        params,
        context,
      })
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.DELETE));
  }
}
