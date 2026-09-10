import {
  Component,
  inject,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoManagerService } from './services';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { withLoading } from '@org/shared/operators';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';

@Component({
  imports: [TodoFormComponent, TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {
  readonly loadingManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly #todoManager = inject(TodoManagerService);

  ngAfterViewInit(): void {
    this.#todoManager.refreshTodos(true);
  }

  createTodo(title: string): void {
    this.#todoManager
      .createTodo(title)
      .pipe(withLoading(this.loadingManagerService))
      .subscribe(() => this.#todoManager.refreshTodos());
  }
}
