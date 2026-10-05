import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { APP_EVENTS, BaseEventManagerService } from '@org/shared';
import { PasswordFieldComponent } from '../ui';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { DYNAMIC_FORM_FACTORY } from '@org/shared';
import { DEFAULT_AUTH_FORM } from '../models';
import { AppRoutes } from '../config';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  readonly appRoute = AppRoutes;

  readonly loading = inject(UserIdentityManager).loading;
  readonly successMessage = inject(UserIdentityManager).successMessage;

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #userIdentityManager = inject(UserIdentityManager);
  readonly #eventManager = inject(BaseEventManagerService);

  login(): void {
    const email = this.form.value.email?.trim() ?? '';
    const password = this.form.value.password?.trim() ?? '';

    this.#userIdentityManager.login({ email, password }).subscribe({
      complete: () => {
        this.#eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGGED_IN);
      },
      error: (error) => {
        const {
          error: { error: serverError },
        } = error;

        this.form.setErrors({
          serverError,
        });
      },
    });
  }
}
