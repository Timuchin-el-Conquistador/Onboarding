import { inject, Injectable } from '@angular/core';
import { TODO_RESOURCE_CHANGE_TOKEN } from '../tokens';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  API_URL_TOKEN,
  LOADER_MANAGER_SERVICE,
  withLoading,
} from '@org/shared';
import { ToasterService } from '@org/my-lib/services';
import { withCondition, withToaster } from '@org/my-lib/operators';
import { TODO_SUCCESS_MESSAGES } from '../types';
import { BASE_ENDPOINT } from '../config';
import { ITodo } from '../models';

@Injectable()
export class TodoResourceChangeNotifierService<T extends ITodo> {
  protected readonly toaster = inject(ToasterService);
  protected readonly loader = inject(LOADER_MANAGER_SERVICE);
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = inject(API_URL_TOKEN);

  readonly #refreshSubject = inject(TODO_RESOURCE_CHANGE_TOKEN);

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

  protected refresh(initial = false) {
    this.#refreshSubject.next(initial);
  }
}
