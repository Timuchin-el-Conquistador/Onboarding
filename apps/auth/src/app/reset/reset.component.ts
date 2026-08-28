import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../app.routes';
import { PasswordFieldComponent } from '../ui';
import { DYNAMIC_FORM_FACTORY, DEFAULT_AUTH_FORM } from '../models';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reset-password-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    PasswordFieldComponent,
  ],
  templateUrl: './reset.component.html',
  styleUrls: ['../auth-shared.scss', './reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPageComponent {
  readonly appRoute = AppRoute;

  readonly loading = inject(UserIdentityManager).loading;
  readonly successMessage = inject(UserIdentityManager).successMessage;

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #userIdentityManager = inject(UserIdentityManager);

  reset(): void {
    const email = this.form.value.email?.trim() ?? '';
    const password = this.form.value.password?.trim() ?? '';

    this.#userIdentityManager.reset({ email, password }).subscribe({
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
