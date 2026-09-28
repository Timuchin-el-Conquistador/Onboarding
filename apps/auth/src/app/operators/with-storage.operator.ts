import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MonoTypeOperatorFunction, tap } from 'rxjs';

export function withStoreToken(
  storage: Storage,
  key: string,
): MonoTypeOperatorFunction<HttpEvent<unknown>> {
  return (source) => {
    return source.pipe(
      tap((httpEvent: HttpEvent<unknown>) => {
        if (httpEvent.type !== HttpEventType.Response) {
          return;
        }

        const token = httpEvent.headers.get(key);

        if (token) {
          storage.setItem(key, token);
        }
      }),
    );
  };
}

export function withRemoveToken<T>(
  storage: Storage,
  key: string,
): MonoTypeOperatorFunction<T> {
  return (source) => {
    return source.pipe(
      tap(() => {
        storage.removeItem(key);
      }),
    );
  };
}
