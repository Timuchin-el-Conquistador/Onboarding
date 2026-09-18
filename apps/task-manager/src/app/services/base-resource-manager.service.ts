import { Observable } from 'rxjs';
import { IOptions, IBody, ITodo } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseResourceManagerService<T extends ITodo> {
  abstract create(body: IBody, options?: IOptions): Observable<T>;
  abstract delete(options?: IOptions): Observable<string>;
}
