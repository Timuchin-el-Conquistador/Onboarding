import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { withLoading } from '../operators/withLoading';
import {
  LOADER_INJECTOR,
  LOADER_MANAGER_SERVICE,
} from '../tokens/loader-manager.token';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const injector = req.context.get(LOADER_INJECTOR);

  if (!injector) {
    return next(req);
  }

  const loader = injector.get(LOADER_MANAGER_SERVICE);

  return next(req).pipe(withLoading(loader));
}
