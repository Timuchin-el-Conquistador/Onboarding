import {
  Component,
  inject,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoFormManagerService, TodoManagerService } from './services';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  imports: [TodoFormComponent, TodoListComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  readonly #todoFormManager = inject(TodoFormManagerService);
  readonly #todoManager = inject(TodoManagerService);

  readonly #destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.#todoManager
      .getTasks()
      .pipe(takeUntil(this.#destroy$))
      .subscribe((tasks) => {
        tasks.forEach((todo) => {
          this.#todoFormManager.createTodo(todo.title, todo.id, todo.tasks);
        });
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  createTodo(title: string): void {
    this.#todoFormManager.createTodo(title);
  }
}
