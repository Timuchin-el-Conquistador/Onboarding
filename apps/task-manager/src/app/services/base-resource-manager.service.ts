import { Observable } from 'rxjs';
import { ITodoBody, IConfig, ITodoDeleted } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseResourceManagerService<T> {
  abstract create(body: ITodoBody, config?: IConfig): Observable<T>;

  abstract delete(config?: IConfig): Observable<T | ITodoDeleted>;

  update?(body: ITodoBody, config?: IConfig): Observable<T>;
}
