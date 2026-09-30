import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BaseEventManagerService } from '@org/shared';
import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function withDispatchEvent(
  eventManager: BaseEventManagerService,
  event: Event,
): MonoTypeOperatorFunction<HttpEvent<unknown>> {
  return (source) => {
    return source.pipe(
      tap((httpEvent: HttpEvent<unknown>) => {
        if (httpEvent.type !== HttpEventType.Response) {
          return;
        }

        eventManager.dispatch(event);
      }),
    );
  };
}
