import { HttpContextToken } from '@angular/common/http';
import { InjectionToken, Injector } from '@angular/core';
import { ILoaderManagerService } from '../models';
import { LoaderManagerService } from '../services/loader-manager.service';

export const LOADER_INJECTOR = new HttpContextToken<Injector | null>(
  () => null,
);

export const LOADER_MANAGER_SERVICE = new InjectionToken<ILoaderManagerService>(
  'LOADER_MANAGER_SERVICE',
  {
    factory: () => new LoaderManagerService(),
  },
);
