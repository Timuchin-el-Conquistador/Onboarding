import { Observable } from 'rxjs';
import { IOptions, IBody, ITodo } from '../models';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { API_URL_TOKEN, LOADER_INJECTOR } from '@org/shared';

@Injectable()
export abstract class BaseResourceManagerService<T extends ITodo> {
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  abstract create(body: IBody, options?: IOptions): Observable<T>;
  abstract delete(options?: IOptions): Observable<string>;
  update?(body: IBody, options?: IOptions): Observable<T>;

  protected createRequestConfig(options?: IOptions) {
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
