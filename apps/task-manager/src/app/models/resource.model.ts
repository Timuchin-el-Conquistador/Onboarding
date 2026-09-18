import { Injector } from '@angular/core';

export interface IOptions {
  injector?: Injector;
  params?: Record<string, string>;
}

export interface IBody {
  name: string;
  completed?: boolean;
}
