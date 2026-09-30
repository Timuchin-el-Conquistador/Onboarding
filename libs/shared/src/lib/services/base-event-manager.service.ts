import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class BaseEventManagerService {
  abstract subscribe(): void;
  abstract dispatch(event: Event): void;
  abstract clean(): void;
}
