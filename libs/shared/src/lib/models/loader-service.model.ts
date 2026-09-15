import { WritableSignal } from '@angular/core';

export interface ILoaderManagerService {
  loading: WritableSignal<boolean>;
  show(): void;
  hide(): void;
}
