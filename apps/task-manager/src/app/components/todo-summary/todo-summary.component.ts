import {
  Component,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSummaryComponent {
  readonly totalTasksCount = input.required<number>();
}
