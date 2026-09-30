import {
  APP_EVENTS,
  BaseEventManagerService,
  ShellRoutes,
  AppRoutes,
} from '@org/shared';
import { ShellButtonConfigType } from '@org/my-lib/types';
import { Injector, runInInjectionContext } from '@angular/core';

export const authenticated: ShellButtonConfigType[] = [
  {
    value: '',
    label: 'Logout',
    color: 'primary',
    variant: 'raised',
    action: (injector: Injector) => {
      runInInjectionContext(injector, () => {
        const eventManager = injector.get(BaseEventManagerService);
        eventManager.dispatch(new CustomEvent(APP_EVENTS.AUTH_USER_LOG_OUT));
      });
    },
  },
];

export const nonAuthenticated: ShellButtonConfigType[] = [
  {
    value: '',
    label: 'Login',
    color: 'primary',
    variant: 'raised',
    routerLink: `/${ShellRoutes.Auth}}/${AppRoutes.Login}`,
  },
  {
    value: '',
    label: 'Register',
    color: 'primary',
    variant: 'raised',
    routerLink: `/${ShellRoutes.Auth}/${AppRoutes.Register}`,
  },
];
