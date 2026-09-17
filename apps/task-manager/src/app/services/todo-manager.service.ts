import { inject, Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { withCondition, withToaster } from '@org/my-lib/operators';
import { ToasterService } from '@org/my-lib/services';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN, LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { withLoading } from '@org/shared/operators';
import { ITodo, ITodoManager } from '../models';
import { TODO_SUCCESS_MESSAGES } from '../types';
import { BaseResourceManagerService } from './base-resource-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TodoManagerService<T extends ITodo>
  extends BaseResourceManagerService<T>
  implements ITodoManager
{
  readonly #loadingManagerService = inject(LOADER_MANAGER_SERVICE);
  readonly #toasterService = inject(ToasterService);
  readonly #refreshTodos$ = new Subject<boolean>();

  constructor() {
    super(inject(HttpClient), inject(API_URL_TOKEN));
  }

  todos$: Observable<ITodo[]> = this.#refreshTodos$.pipe(
    switchMap((initial: boolean) =>
      this.http
        .get<ITodo[]>(this.baseUrl + '/v1/todo')
        .pipe(
          withCondition(initial, [
            withLoading(this.#loadingManagerService),
            withToaster(this.#toasterService, TODO_SUCCESS_MESSAGES.GET),
          ]),
        ),
    ),
  );

  refreshTodos(initial: boolean = false): void {
    this.#refreshTodos$.next(initial);
  }
}
