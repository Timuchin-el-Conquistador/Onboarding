export abstract class BaseEventManagerService {
  abstract dispatch(event: string): void;
}
