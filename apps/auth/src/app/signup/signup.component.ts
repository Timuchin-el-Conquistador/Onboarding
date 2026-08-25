import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordFieldComponent } from '../ui';
import {
  CREDENTIALS_FORM_CONFIG,
  DYNAMIC_FORM_FACTORY,
  IAuthForm,
} from '../models';

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
  readonly form = inject(DYNAMIC_FORM_FACTORY).createForm<IAuthForm>(CREDENTIALS_FORM_CONFIG);
}
