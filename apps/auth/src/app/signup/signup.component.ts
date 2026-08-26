import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordFieldComponent } from '../ui';
import { DYNAMIC_FORM_FACTORY, DEFAULT_AUTH_FORM } from '../models';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { finalize } from 'rxjs';
import { INCORRECT_CREDENTIALS } from '../constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AppRoute } from '../app.routes';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {
  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #userIdentityManager = inject(UserIdentityManager);

  readonly #cd = inject(ChangeDetectorRef)

  readonly #router = inject(Router)

  loading = false;

  signup() {
    this.loading = true;

    const email = this.form.value.email?.trim() ?? '';
    const password = 'AzericS@2016';

    this.#userIdentityManager
      .signup({ email, password })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.#cd.markForCheck()

          setTimeout(() => {
            this.#router.navigate([AppRoute.Login])
          })
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
