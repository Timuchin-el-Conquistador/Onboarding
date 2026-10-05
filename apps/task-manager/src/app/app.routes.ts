import { Route } from '@angular/router';
import { App } from './app';
import { TaskManagerService, TodoManagerService } from './services';

export const appRoutes: Route[] = [
  {
    path: '',
    component: App,
    providers: [TodoManagerService, TaskManagerService],
  },
];
