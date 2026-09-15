import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  effect,
  Injector,
  Renderer2, DestroyRef
} from '@angular/core';
import { TodoManagerService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { AsyncPipe } from '@angular/common';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoLoadingDirective } from '../../directives';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    TodoCardComponent,
    ReactiveFormsModule,
    AsyncPipe,
    EmptyStateComponent,
    TodoLoadingDirective,
    TodoFormComponent,
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly loadingManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly todos$ = inject(TodoManagerService).todos$;

  @ViewChild('skeleton', { read: ElementRef })
  skeleton?: ElementRef<HTMLElement>;

  readonly #renderer = inject(Renderer2);
  readonly #injector = inject(Injector);
  readonly #todoManager = inject(TodoManagerService);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      if (!this.loadingManagerService.loading()) {
        return;
      }

      if (!this.skeleton) {
        return;
      }

      this.#renderer.addClass(
        this.skeleton.nativeElement,
        'todo-app__skeleton--display',
      );

      this.skeleton.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    });
  }

  createTodo(title: string): void {
    this.#todoManager
      .createTodo(title, this.#injector)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.#todoManager.refreshTodos());
  }
}
