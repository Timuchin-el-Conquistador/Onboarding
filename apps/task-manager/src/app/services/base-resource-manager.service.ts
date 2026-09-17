import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LOADER_INJECTOR } from '@org/shared/tokens';
import { CrudOptions, ITodo, IBody } from '../models';
import { IBaseManager } from '../models/resource.model';

export class BaseResourceManagerService<
  T extends ITodo,
> implements IBaseManager {
  constructor(
    protected readonly http: HttpClient,
    protected readonly baseUrl: string,
  ) {}

  create(suffix: string, body: IBody, options?: CrudOptions): Observable<T> {
    const config = this.createRequestConfig(options);

    return this.http.post<T>(`${this.baseUrl}/${suffix}`, body, config);
  }

  delete(suffix: string, options?: CrudOptions): Observable<unknown> {
    const config = this.createRequestConfig(options);

    return this.http.delete<string>(`${this.baseUrl}/${suffix}`, config);
  }

  protected createRequestConfig(options?: CrudOptions) {
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
