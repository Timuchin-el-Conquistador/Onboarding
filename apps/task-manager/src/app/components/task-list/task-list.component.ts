import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskManagerService } from '../../services';
import { TaskSummaryComponent } from '../task-summary/task-summary.component';

@Component({
  imports: [TaskItemComponent, TaskSummaryComponent, AsyncPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  readonly tasks$ = inject(TaskManagerService).tasks$;
}
