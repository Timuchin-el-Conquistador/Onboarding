import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-todo-actions',
  templateUrl: './todo-actions.component.html',
  styleUrls: ['./todo-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoActionsComponent {
  readonly totalTasksCount = input<number>();
  readonly removeTodo = output<void>();
}
