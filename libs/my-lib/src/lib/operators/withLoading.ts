import { WritableSignal } from '@angular/core';
import { Observable, defer, finalize } from 'rxjs';

export function withLoading(
  signal: WritableSignal<boolean>,
): <T>(source$: Observable<T>) => Observable<T> {
  return <T>(source$: Observable<T>): Observable<T> =>
    defer(() => {
      signal.set(true);

      return source$.pipe(finalize(() => signal.set(false)));
    });
}
