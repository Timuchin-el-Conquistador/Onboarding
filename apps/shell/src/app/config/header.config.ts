import { ButtonConfigType, ShellRoutes } from '@org/shared';
import { AppRoutes } from '@org/shared';

export const authenticated: ButtonConfigType[] = [
  {
    value: '',
    label: 'Logout',
    color: 'primary',
    variant: 'raised',
    routerLink: `/${ShellRoutes.Auth}/${AppRoutes.Logout}`,
  },
];

export const nonAuthenticated: ButtonConfigType[] = [
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
