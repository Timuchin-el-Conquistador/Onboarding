import { BaseEventManagerService } from '@org/shared';
import { Observable, tap } from 'rxjs';
import { APP_EVENTS } from '../config';
import { isITodoResponse } from '../utils';
import { IHistoryBody } from '../models';

export function withDispatchEvent<T>(
  eventManager: BaseEventManagerService<IHistoryBody>,
  eventName: keyof typeof APP_EVENTS,
  todoId?: string,
  data?: any,
) {
  return (source: Observable<T>) =>
    source.pipe(
      tap((response) => {
        const responseId = isITodoResponse(response) ? response.id : '';

        eventManager.dispatch({
          event: eventName,
          todo_id: todoId ?? responseId,
          data: data ?? response,
        });
      }),
    );
}
