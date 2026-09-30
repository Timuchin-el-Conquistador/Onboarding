import { Injector } from '@angular/core';
import { ButtonConfigType } from '@org/shared';

export type ShellButtonConfigType = ButtonConfigType & {
  routerLink?: string;
  action?(injector: Injector): void;
};
