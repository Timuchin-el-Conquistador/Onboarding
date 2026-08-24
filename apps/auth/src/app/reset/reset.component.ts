import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../app.routes';
import { PasswordFieldComponent } from '../ui/password-field/password-field.component';

@Component({
  selector: 'app-reset-password-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './reset.component.html',
  styleUrls: ['../auth-shared.scss', './reset.component.scss'],
})
export class ResetPasswordPageComponent {
  protected readonly appRoute = AppRoute;

}
