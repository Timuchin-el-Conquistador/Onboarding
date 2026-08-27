import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordFieldComponent } from '../ui';
import { DYNAMIC_FORM_FACTORY, DEFAULT_AUTH_FORM } from '../models';
import type { IAuthForm } from '../models';
import { UserIdentityManager } from '../services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

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
  readonly successMessage = signal('');

  readonly loading = inject(UserIdentityManager).loading;

  readonly form =
    inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(DEFAULT_AUTH_FORM);

  readonly #userIdentityManager = inject(UserIdentityManager);

  signup() {
    const email = this.form.value.email?.trim() ?? '';
    const password = this.form.value.password?.trim() ?? '';

    this.#userIdentityManager.signup({ email, password }).subscribe({
      next: () => {
        this.successMessage.set('Account created successfully.');
        setTimeout(() => {
          this.successMessage.set('');
        }, 2000);
      },
      error: (error) => {
        this.form.setErrors({
          serverError: error.error.error,
        });
      },
    });
  }
}
