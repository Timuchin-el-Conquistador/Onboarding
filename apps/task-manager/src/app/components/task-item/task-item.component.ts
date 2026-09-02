import {
  Component,
  input,
  ChangeDetectionStrategy,
  signal,
  output,
  ViewChild,
} from '@angular/core';
import type { ITaskForm } from '../../models';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldsComponent } from '../ui/form-fields/form-fields.component';

@Component({
  imports: [ReactiveFormsModule, FormFieldsComponent],
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  readonly task = input.required<FormGroup<ITaskForm>>();
  readonly removeTask = output<void>();
  readonly editing = signal(false);

  @ViewChild(FormFieldsComponent)
  private readonly taskFields!: FormFieldsComponent;

  get id(): number {
    return this.task().controls.id.value;
  }

  get title(): string {
    return this.task().controls.title.value ?? '';
  }

  get completed(): boolean {
    return this.task().controls.completed.value ?? false;
  }

  edit(): void {
    this.editing.set(true);
  }

  onSave(): void {
    const task = this.task();

    if (task.invalid) {
      task.markAllAsTouched();
      this.taskFields.focusInvalid();
      return;
    }
    
    if (!task.controls.title.value.trim()) {
      task.controls.title.setErrors({ required: true });
      task.controls.title.markAsTouched();
      this.taskFields.focusInvalid();
      return
    }

    task.markAsUntouched();
    task.markAsPristine();

    this.editing.set(false);
  }
}
