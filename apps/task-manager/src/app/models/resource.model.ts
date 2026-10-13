import { HttpContext, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { APP_EVENTS } from '../config';
import { ITodo } from './todo.model';

export interface IConfig {
  params: HttpParams;
  context: HttpContext;
}

export interface IOptions {
  injector?: Injector;
  params?: Record<string, string>;
}

export interface ITodoBody {
  name: string;
  completed?: boolean;
}

export interface IHistoryBody {
  event: keyof typeof APP_EVENTS;
  todo_id: string;
  data: any;
}

export interface ITodoDeleted {
  deleted: true;
}

export interface ITodoResponse extends ITodo {
  userId: string;
}
