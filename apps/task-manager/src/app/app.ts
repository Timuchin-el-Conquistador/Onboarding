import {
  Component,
  inject,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoManagerService } from './services';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  imports: [TodoFormComponent, TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  readonly loading = inject(TodoManagerService).loading;
  readonly #todoManager = inject(TodoManagerService);

  ngAfterViewInit(): void {
    this.#todoManager.refreshTodos(true);
  }

  createTodo(title: string): void {
    this.#todoManager
      .createTodo(title)
      .subscribe(() => this.#todoManager.refreshTodos());
  }
}
