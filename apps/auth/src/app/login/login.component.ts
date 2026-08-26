import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../app.routes';
import { PasswordFieldComponent } from '../ui';
import { DYNAMIC_FORM_FACTORY, DEFAULT_AUTH_FORM } from '../models';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { finalize } from 'rxjs/operators';
import { INCORRECT_CREDENTIALS } from '../constants';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
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

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #userIdentityManager = inject(UserIdentityManager);

  loading = false;

  login() {
    this.loading = true;

    const email = this.form.value.email?.trim() ?? '';
    const password = 'AzericS@2016';

    this.#userIdentityManager
      .login({ email, password })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        error: (error) => {
          this.form.setErrors({
            serverError: error.error.error,
          });
        },
      });
  }
}
