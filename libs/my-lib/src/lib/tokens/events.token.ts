import { inject, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { APP_EVENTS, ShellRoutes } from '@org/shared';
import { ShellEventType } from '../types';

export const EVENTS = new InjectionToken<ShellEventType[]>('Events', {
  factory() {
    const router = inject(Router);
    return [
      {
        type: APP_EVENTS.AUTH_USER_LOGGED_IN,
        action: () => {
          router.navigate([`/${ShellRoutes.Dashboard}`]);
        },
      },
      {
        type: APP_EVENTS.AUTH_USER_LOGGED_OUT,
        action: () => {
          router.navigate([`/${ShellRoutes.Auth}`]);
        },
      },
    ];
  },
});
