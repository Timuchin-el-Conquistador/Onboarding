import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptions, IBody, ITodo } from '../models';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { BASE_ENDPOINT } from '../config/endpoints.config';
import { TodoResourceChangeNotifierService } from './todo-resource-change-notifier.service';
import { HttpContext, HttpParams } from '@angular/common/http';
import { LOADER_INJECTOR } from '@org/shared';

@Injectable()
export class TodoManagerService<T extends ITodo>
  extends TodoResourceChangeNotifierService<T>
  implements BaseResourceManagerService<T>
{
  create(body: IBody, options?: IOptions): Observable<T> {
    const config = this.#createRequestConfig(options);

    return this.http.post<T>(`${this.baseUrl}/${BASE_ENDPOINT}`, body, config);
  }

  delete(options?: IOptions): Observable<string> {
    const config = this.#createRequestConfig(options);

    return this.http.delete<string>(`${this.baseUrl}/${BASE_ENDPOINT}`, config);
  }

  #createRequestConfig(options?: IOptions) {
    let params = new HttpParams();
    let context = new HttpContext();

    for (const [key, value] of Object.entries(options?.params ?? {})) {
      params = params.set(key, value);
    }

    if (options?.injector) {
      context = context.set(LOADER_INJECTOR, options.injector);
    }

    return { params, context };
  }
}
