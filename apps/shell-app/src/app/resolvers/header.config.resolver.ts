import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AppRoutes, AuthService } from '@org/shared';
import { ButtonConfigType } from '@org/shared';

const authentificated: ButtonConfigType[] = [
  {
    value: '',
    label: 'Logout',
    color: 'primary',
    variant: 'raised',
  },
];

const nonAutentificated: ButtonConfigType[] = [
  {
    value: '',
    label: 'Login',
    color: 'primary',
    variant: 'raised',
    routerLink: `/auth/${AppRoutes.Login}`,
  },

  {
    value: '',
    label: 'Register',
    color: 'primary',
    variant: 'raised',
    routerLink: `/auth/${AppRoutes.Register}`,
  },
];

export const headerConfigResolver: ResolveFn<ButtonConfigType[]> = () => {
  const authService = inject(AuthService);

  if (authService.isAuthentificated()) {
    return authentificated;
  }

  return nonAutentificated;
};
