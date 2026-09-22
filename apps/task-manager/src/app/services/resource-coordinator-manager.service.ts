import { inject, Injectable } from '@angular/core';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { Observable, switchMap } from 'rxjs';
import { IBody, IConfig, IOptions } from '../models';
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import {
  API_URL_TOKEN,
  LOADER_INJECTOR,
  LOADER_MANAGER_SERVICE,
  withLoading,
} from '@org/shared';
import {
  ToasterService,
  withCondition,
  withToaster,
} from '@org/my-lib/interceptors';
import { BASE_ENDPOINT } from '../config';
import { TODO_SUCCESS_MESSAGES } from '../types';
import { SUBJECT_TOKEN } from '../tokens';

@Injectable()
export class ResourceCoordinatorManagerService<
  T,
> implements BaseResourceManagerService<T> {
  readonly toaster = inject(ToasterService);
  readonly loader = inject(LOADER_MANAGER_SERVICE);
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  readonly #refreshSubject = inject(SUBJECT_TOKEN);

  todos$: Observable<T[]> = this.#refreshSubject.pipe(
    switchMap((initial: boolean) =>
      this.http
        .get<T[]>(`${this.baseUrl}/${BASE_ENDPOINT}`)
        .pipe(
          withCondition(initial, [
            withLoading(this.loader),
            withToaster(this.toaster, TODO_SUCCESS_MESSAGES.GET),
          ]),
        ),
    ),
  );

  constructor(private readonly service: BaseResourceManagerService<T>) {}

  create(body: IBody, config?: IConfig): Observable<T> {
    return this.service.create(body, config);
  }

  delete(config?: IConfig): Observable<T> {
    return this.service.delete(config);
  }

  update(body: IBody, config?: IConfig): Observable<T> {
    return this.service.update!(body, config);
  }

  getAll(initial = false) {
    this.#refreshSubject.next(initial);
  }

  createRequestConfig(options?: IOptions): IConfig {
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
