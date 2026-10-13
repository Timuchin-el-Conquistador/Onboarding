import { Route } from '@angular/router';
import { App } from './app';
import { TaskManagerService, TodoManagerService } from './services';
import { HistoryManagerService } from './services/history-manager.service';

export const appRoutes: Route[] = [
  {
    path: '',
    component: App,
    providers: [TodoManagerService, TaskManagerService, HistoryManagerService],
  },
];
