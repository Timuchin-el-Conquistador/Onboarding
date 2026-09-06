import {
  catchError,
  Observable,
  OperatorFunction,
  tap,
  throwError,
} from 'rxjs';
import { IToaster } from '../models/toaster.model';
import { HttpErrorResponse } from '@angular/common/http';

export function withToaster<T>(
  toaster: IToaster,
  successMessage: string,
  delayMs = 2000,
): OperatorFunction<T, T> {
  return (source$): Observable<T> =>
    source$.pipe(
      tap(() => {
        toaster.success(successMessage, delayMs);
      }),
      catchError((error: HttpErrorResponse) => {
        const {
          error: { error: serverError },
        } = error;

        toaster.error(serverError, delayMs);

        return throwError(() => error);
      }),
    );
}
