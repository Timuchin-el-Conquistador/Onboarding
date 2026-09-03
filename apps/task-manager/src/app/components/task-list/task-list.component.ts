import {
  Component,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TodoFormManagerService } from '../../services';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITaskForm } from '../../models';

@Component({
  imports: [TaskItemComponent, ReactiveFormsModule, AsyncPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly todoIndex = input.required<number>();
  readonly form = input.required<FormArray<FormGroup<ITaskForm>>>();
  readonly #todoFormManager = inject(TodoFormManagerService);

  removeTask(index: number): void {
    this.#todoFormManager.removeTask(this.todoIndex(), index);
  }
}
