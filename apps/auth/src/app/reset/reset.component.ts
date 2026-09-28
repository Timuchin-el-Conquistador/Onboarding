import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoutes, LOADER_MANAGER_SERVICE } from '@org/shared';
import { PasswordFieldComponent } from '../ui';
import { DEFAULT_AUTH_FORM } from '../models';
import { DYNAMIC_FORM_FACTORY } from '@org/shared';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  readonly appRoute = AppRoutes;

  readonly loader = inject(LOADER_MANAGER_SERVICE);
  readonly successMessage = inject(UserIdentityManager).successMessage;

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #destroyRef = inject(DestroyRef);
  readonly #userIdentityManager = inject(UserIdentityManager);

  reset(): void {
    const email = this.form.value.email?.trim() ?? '';
    const password = this.form.value.password?.trim() ?? '';

    this.#userIdentityManager
      .reset({ email, password })
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
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
