import { HttpContext, HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';

export interface IConfig {
  params: HttpParams;
  context: HttpContext;
}

export interface IOptions {
  injector?: Injector;
  params?: Record<string, string>;
}

export interface IBody {
  name: string;
  completed?: boolean;
}
