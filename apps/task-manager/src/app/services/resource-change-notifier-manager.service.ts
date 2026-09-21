import { inject, Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class ResourceChangeNotifierManagerService<T extends ITodo> {
  readonly toaster = inject(ToasterService);
  readonly loader = inject(LOADER_MANAGER_SERVICE);
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  readonly #refreshSubject = new Subject<boolean>();

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

  refresh(initial = false) {
    this.#refreshSubject.next(initial);
  }
}
