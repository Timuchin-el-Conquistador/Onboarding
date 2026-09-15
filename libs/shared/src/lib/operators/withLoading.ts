import { Observable, defer, finalize } from 'rxjs';
import { ILoaderManagerService } from '../models';

export function withLoading(
  loaderManagerService: ILoaderManagerService,
): <T>(source$: Observable<T>) => Observable<T> {
  return <T>(source$: Observable<T>): Observable<T> =>
    defer(() => {
      loaderManagerService.show();

      return source$.pipe(finalize(() => loaderManagerService.hide()));
    });
}
