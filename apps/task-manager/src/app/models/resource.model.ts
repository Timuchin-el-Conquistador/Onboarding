import { Injector } from '@angular/core';
import { IBody, ITodo } from './todo.model';
import { Observable } from 'rxjs';

export interface CrudOptions {
  injector?: Injector;
  params?: Record<string, string>;
}

export interface IBaseManager {
  create(suffix: string, body: IBody, options?: CrudOptions): Observable<ITodo>;
  delete(suffix: string, options?: CrudOptions): Observable<unknown>;
}

export interface ITodoManager extends IBaseManager {
  refreshTodos(initial?: boolean): void;
}

export interface ITaskManager extends IBaseManager {
  update(suffix: string, body: IBody, options?: CrudOptions): Observable<ITodo>;
}
