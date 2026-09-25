import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '@org/shared';
import { ButtonConfigType } from '@org/shared';
import { authenticated, nonAuthenticated } from '../config';

export const headerConfigResolver: ResolveFn<ButtonConfigType[]> = () => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return authenticated;
  }

  return nonAuthenticated;
};
