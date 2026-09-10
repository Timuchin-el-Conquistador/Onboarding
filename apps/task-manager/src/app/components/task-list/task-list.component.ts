import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ITask } from '../../models';
import { EmptyStateComponent } from '../ui/empty-state/empty-state.component';

@Component({
  imports: [TaskItemComponent, ReactiveFormsModule, EmptyStateComponent],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly todoId = input.required<string>();
  readonly tasks = input.required<ITask[]>();
}
