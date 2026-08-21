import { Route } from '@angular/router';
import { LoginPageComponent } from './login/login.component';
import { ResetPasswordPageComponent } from './reset/reset.component';
import { SignupPageComponent } from './signup/signup.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'reset', component: ResetPasswordPageComponent },
  { path: 'reset-password', redirectTo: 'reset', pathMatch: 'full' },
];
