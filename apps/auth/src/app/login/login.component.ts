import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../app.routes';
import { PasswordFieldComponent } from '../ui';
import { DYNAMIC_FORM_FACTORY, DEFAULT_AUTH_FORM } from '../models';
import type { IAuthForm } from '../models';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PasswordFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../auth-shared.scss', './login.component.scss'],
})
export class LoginPageComponent {
  protected readonly appRoute = AppRoute;

  readonly form = inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM)
}
