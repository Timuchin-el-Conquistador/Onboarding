import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskLoadingComponent } from '../task/task-loading.component';

@Component({
  selector: 'app-todo-loading',
  templateUrl: './todo-loading.component.html',
  styleUrls: ['./todo-loading.component.scss'],
  imports: [TaskLoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoLoadingComponent {}
