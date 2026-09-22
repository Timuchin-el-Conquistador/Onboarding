import { Observable } from 'rxjs';
import { IBody, IConfig } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseResourceManagerService<T> {
  abstract create(body: IBody, config?: IConfig): Observable<T>;

  abstract delete(config?: IConfig): Observable<T>;

  update?(body: IBody, config?: IConfig): Observable<T>;
}
