import {
  Component,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TodoFormManagerService, TodoManagerService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { CardLoadingComponent } from '../ui/loading/card/card.component';

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
  readonly form = inject(TodoFormManagerService).form;
  readonly todosForm = this.form.controls.todo;
  readonly todoForm$ = this.todosForm.valueChanges;
}
