import { WritableSignal } from '@angular/core';
import { tap, delay, finalize, OperatorFunction } from 'rxjs';

export function withSuccessMessage<T>(
  signal: WritableSignal<string>,
  message: string,
  delayMs = 2000,
): OperatorFunction<T, T> {
  return (source$) =>
    source$.pipe(
      tap(() => signal.set(message)),
      delay(delayMs),
      finalize(() => signal.set('')),
    );
}
