import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoFormManagerService, TodoManagerService } from './services';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [TodoFormComponent, TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #todoFormManager = inject(TodoFormManagerService);
  readonly #todoManager = inject(TodoManagerService);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#todoManager
      .getTasks()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((tasks) => {
        tasks.forEach((todo) => {
          this.#todoFormManager.createTodo(todo.title, todo.id, todo.tasks);
        });
      });
  }

  createTodo(title: string): void {
    this.#todoFormManager.createTodo(title);
  }
}
