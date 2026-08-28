import { Component, input } from '@angular/core';
import { ITask } from '../../models';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  readonly task = input<ITask>();
}
