import { AppEventManager } from '@org/shared';
import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function withDispatchEvent<T>(
  eventManager: AppEventManager,
  event: Event,
): MonoTypeOperatorFunction<T> {
  return (source) => {
    return source.pipe(
      tap(() => {
        eventManager.dispatch(event);
      }),
    );
  };
}
