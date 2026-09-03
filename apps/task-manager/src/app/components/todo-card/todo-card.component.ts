import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { TodoFormManagerService } from '../../services';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';
import type { ITodoForm } from '../../models';

@Component({
  imports: [
    ReactiveFormsModule,
    TaskListComponent,
    TodoFormComponent,
    TodoActionsComponent,
  ],
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  readonly todoIndex = input.required<number>();
  readonly todoForm = input.required<FormGroup<ITodoForm>>();
  
  readonly #todoFormManager = inject(TodoFormManagerService);

  createTask(todoIndex: number, title: string): void {
    this.#todoFormManager.createTask(todoIndex, title);
  }

  totalTasksCount(index: number): number {
    return this.#todoFormManager
      .getTodoTasks(index)
      .controls.filter((task) => !task.controls.completed.value).length;
  }

  isTodoCompleted(index: number): boolean {
    const tasks = this.#todoFormManager.getTodoTasks(index);

    return (
      tasks.length > 0 &&
      tasks.controls.every((task) => task.controls.completed.value)
    );
  }

  removeTodo(index: number): void {
    const confirmed = confirm(
      'Are you sure you want to delete this todo?\n\nThis will also delete all tasks associated with it.',
    );

    if (!confirmed) {
      return;
    }

    this.#todoFormManager.removeTodo(index);
  }
}
