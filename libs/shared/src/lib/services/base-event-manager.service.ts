import { Observable } from "rxjs";

export abstract class BaseEventManagerService<T> {
  abstract events$: Observable<T>
  abstract dispatch(event: T): void;
}
