import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { TodoManagerService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { AsyncPipe } from '@angular/common';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';
import { TodoLoadingDirective } from '../../directives';

@Component({
  imports: [
    TodoCardComponent,
    ReactiveFormsModule,
    AsyncPipe,
    EmptyStateComponent,
    TodoLoadingDirective,
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

  constructor() {
    effect(() => {
      if (!this.loadingManagerService.loading()) {
        return;
      }

      if (!this.skeleton?.nativeElement) {
        return;
      }

      this.skeleton.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    });
  }
}
