import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TodoFormManagerService, TodoManagerService } from '../../services';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { CardLoadingComponent } from '../ui/loading/card/card.component';
import type { ITodoListForm } from '../../models';

@Component({
  imports: [
    TodoCardComponent,
    ReactiveFormsModule,
    CardLoadingComponent,
    AsyncPipe,
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly loading = inject(TodoManagerService).loading;
  readonly todoForm = inject(TodoFormManagerService).form;
  readonly todoForm$ = this.todoForm.controls.todo.valueChanges;

  get todos(): FormArray<FormGroup<ITodoListForm>> {
    return this.todoForm.controls.todo;
  }
}
