import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  API_URL_TOKEN,
  ToasterService,
  withToaster,
} from '@org/my-lib/operators';
import { ITodo, IEditTask } from '../models';
import { TASK_SUCCESS_MESSAGES } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  readonly #http = inject(HttpClient);
  readonly #base_url = inject(API_URL_TOKEN);
  readonly #toasterService = inject(ToasterService);

  createTask(id: string, name: string): Observable<ITodo> {
    return this.#http
      .post<ITodo>(
        this.#base_url + '/v1/todo/task',
        { name },
        { params: { id } },
      )
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.CREATE));
  }

  updateTask(
    task: IEditTask,
    todoId: string,
    taskId: string,
  ): Observable<ITodo> {
    return this.#http
      .post<ITodo>(this.#base_url + '/v1/todo/edit-task', task, {
        params: { id: todoId, 'task-id': taskId },
      })
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.UPDATE));
  }

  removeTask(todoId: string, taskId: string): Observable<ITodo> {
    return this.#http
      .delete<ITodo>(this.#base_url + '/v1/todo/task', {
        params: {
          id: todoId,
          'task-id': taskId,
        },
      })
      .pipe(withToaster(this.#toasterService, TASK_SUCCESS_MESSAGES.DELETE));
  }
}
