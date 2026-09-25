import { ButtonConfigType } from '@org/shared';
import { AppRoutes } from '@org/shared';

export const authentificated: ButtonConfigType[] = [
  {
    value: '',
    label: 'Logout',
    color: 'primary',
    variant: 'raised',
  },
];

export const nonAutentificated: ButtonConfigType[] = [
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
