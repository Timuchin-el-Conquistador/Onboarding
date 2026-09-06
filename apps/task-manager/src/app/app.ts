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
import { ITodo } from './models';
import { from, switchMap } from 'rxjs';

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
      .getTodos()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        switchMap((todos: ITodo[]) => from(todos)),
      )
      .subscribe((todo: ITodo) => {
        this.#todoFormManager.createTodo(todo.id, todo.name, todo.tasks);
      });
  }

  createTodo(title: string): void {
    this.#todoManager
      .createTodo(title)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((todo: ITodo) =>
        this.#todoFormManager.createTodo(todo.id, todo.name, todo.tasks),
      );
  }
}
