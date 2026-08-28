import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss'],
})
export class TaskSummaryComponent {
  readonly totalTasksCount = input<number>();
}
