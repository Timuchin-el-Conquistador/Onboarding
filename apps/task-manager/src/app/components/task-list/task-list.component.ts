import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ITaskForm, TodoFormManagerService } from '../../services';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';

@Component({
  imports: [TaskItemComponent, ReactiveFormsModule, AsyncPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly #todoFormManager = inject(TodoFormManagerService);

  readonly todoForm = this.#todoFormManager.form;
  readonly tasksForm$ = this.todoForm.controls.tasks.valueChanges;

  get hasTasks(): boolean {
    return this.todoForm.controls.tasks.length > 0;
  }

  get tasksCount(): number {
    return this.todoForm.controls.tasks.length;
  }

  get tasksForm(): FormArray<FormGroup<ITaskForm>> {
    return this.todoForm.controls.tasks;
  }

  removeTask = (index: number): void => {
    this.#todoFormManager.removeTask(index);
  };
}
