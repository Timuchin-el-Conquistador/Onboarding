import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../app.routes';
import { PasswordFieldComponent } from '../ui/password-field/password-field.component';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PasswordFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../auth-shared.scss', './login.component.scss'],
})
export class LoginPageComponent {
  protected readonly appRoute = AppRoute;
}
