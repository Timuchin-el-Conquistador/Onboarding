import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './password-field.component.html',
  styleUrls: ['../../auth-shared.scss', './password-field.component.scss'],
})
export class PasswordFieldComponent {
  hidden = false;

  toggleVisibility(): void {
    this.hidden = !this.hidden;
  }
}
