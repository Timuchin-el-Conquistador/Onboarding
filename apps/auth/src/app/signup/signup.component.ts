import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordFieldComponent } from '../ui/password-field/password-field.component';

@Component({
  selector: 'app-signup-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PasswordFieldComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-shared.scss', './signup.component.scss'],
})
export class SignupPageComponent {}
