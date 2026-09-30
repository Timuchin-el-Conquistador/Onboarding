import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '@org/shared';
import { ShellButtonConfigType } from '@org/my-lib/types';
import { authenticated, nonAuthenticated } from '../config';

export const headerConfigResolver: ResolveFn<ShellButtonConfigType[]> = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return authenticated;
  }

  return nonAuthenticated;
};
