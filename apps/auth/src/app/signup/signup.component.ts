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
import { PasswordFieldComponent } from '../ui';
import { DEFAULT_AUTH_FORM } from '../models';
import { DYNAMIC_FORM_FACTORY, LOADER_MANAGER_SERVICE } from '@org/shared';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signup-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    PasswordFieldComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared.scss', './signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPageComponent {
  readonly loader = inject(LOADER_MANAGER_SERVICE);
  readonly successMessage = inject(UserIdentityManager).successMessage;

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #destroyRef = inject(DestroyRef);
  readonly #userIdentityManager = inject(UserIdentityManager);

  signup(): void {
    const email = this.form.value.email?.trim() ?? '';
    const password = this.form.value.password?.trim() ?? '';

    this.#userIdentityManager
      .signup({ email, password })
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
