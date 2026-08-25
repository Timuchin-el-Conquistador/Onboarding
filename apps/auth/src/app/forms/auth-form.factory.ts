import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InjectionToken } from '@angular/core';

interface AuthForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

interface AuthFormFactory {
  create(): FormGroup<AuthForm>;
}

export const AUTH_FORM_FACTORY = new InjectionToken<AuthFormFactory>(
  'AUTH_FORM_FACTORY',
);

export class CredentialsFormFactory implements AuthFormFactory {
  constructor(private readonly fb: FormBuilder) {}

  create(): FormGroup<AuthForm> {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
