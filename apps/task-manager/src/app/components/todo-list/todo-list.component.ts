import {
  Component,
  inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TodoFormManagerService, TodoManagerService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoLoadingComponent } from '../ui/loading/todo/todo-loading.component';

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
  readonly loading = inject(TodoManagerService).loading;
  readonly form = inject(TodoFormManagerService).form;

  readonly todosForm = this.form.controls.todo;
  readonly todoForm$ = this.todosForm.valueChanges;

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
