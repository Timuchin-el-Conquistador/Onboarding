import { Component, computed, input } from '@angular/core';
import { ITask } from '../../models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  readonly task = input<ITask>();
  readonly finished = computed(() => this.task()?.finished);
  readonly label = computed(
    () => `${this.finished() ? 'Finished' : 'Pending'} Task`,
  );
}
