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
import { TodoLoadingComponent } from '../ui/loading/todo/todo-loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [
    TodoCardComponent,
    ReactiveFormsModule,
    TodoLoadingComponent,
    AsyncPipe,
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly todos$ = inject(TodoManagerService).todos$;
  readonly loading = inject(TodoManagerService).loading;

  @ViewChild('skeleton', { read: ElementRef })
  skeleton?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      if (!this.loading()) {
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
