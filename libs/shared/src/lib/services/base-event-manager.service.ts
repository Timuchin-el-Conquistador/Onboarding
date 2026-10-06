export abstract class BaseEventManagerService<T> {
  abstract dispatch(event: T): void;
}
