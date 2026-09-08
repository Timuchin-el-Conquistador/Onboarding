import { WritableSignal } from '@angular/core';
import { tap, OperatorFunction, asapScheduler, Observable } from 'rxjs';

export function withSuccessMessage<T>(
  signal: WritableSignal<string>,
  message: string,
  delayMs = 2000,
): OperatorFunction<T, T> {
  return (source$): Observable<T> =>
    source$.pipe(
      tap(() => {
        signal.set(message);
        asapScheduler.schedule(() => signal.set(''), delayMs);
      }),
    );
}
