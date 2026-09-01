import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss'],
})
export class TaskSummaryComponent {
  readonly totalTasksCount = input<number>();
  readonly clearTasks = output<void>();
}
