import {
  Component,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TodoFormManagerService } from '../../services';
import { ITaskForm } from '../../models';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';

@Component({
  imports: [TaskItemComponent, ReactiveFormsModule, AsyncPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly todoIndex = input.required<number>();
  readonly #todoFormManager = inject(TodoFormManagerService);

  get tasksForm(): FormArray<FormGroup<ITaskForm>> {
    return this.#todoFormManager.getTodoTasks(this.todoIndex());
  }

  get tasksForm$() {
    return this.tasksForm.valueChanges;
  }

  get tasksGroup(): FormGroup<ITaskForm>[] {
    return this.tasksForm.controls;
  }

  removeTask(index: number): void {
    this.#todoFormManager.removeTask(this.todoIndex(), index);
  }
}
