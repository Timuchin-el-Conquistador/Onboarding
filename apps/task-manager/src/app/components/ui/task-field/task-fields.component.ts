import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-fields',
  templateUrl: './task-fields.component.html',
  styleUrls: ['./task-fields.component.scss'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFieldsComponent {
  readonly titleControl = input.required<FormControl<string>>();
  readonly descriptionControl = input.required<FormControl<string>>();

  @ViewChild('title')
  private titleInput!: ElementRef<HTMLInputElement>;

  @ViewChild('description')
  private descriptionInput!: ElementRef<HTMLInputElement>;

  focusInvalid(): void {
    if (this.titleControl().invalid) {
      this.titleInput.nativeElement.focus();
      return;
    }

    if (this.descriptionControl().invalid) {
      this.descriptionInput.nativeElement.focus();
    }
  }
}
