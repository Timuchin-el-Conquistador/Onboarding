import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordFieldComponent } from '../ui/password-field/password-field.component';

@Component({
  selector: 'app-signup-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PasswordFieldComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared.scss', './signup.component.scss'],
})
export class SignupPageComponent {
  private fb = inject(FormBuilder);

  readonly form = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
