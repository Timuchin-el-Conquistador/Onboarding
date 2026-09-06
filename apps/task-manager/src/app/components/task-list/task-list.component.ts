import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITaskForm } from '../../models';

@Component({
  imports: [TaskItemComponent, ReactiveFormsModule, AsyncPipe],
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly todoId = input.required<string>();
  readonly form = input.required<FormArray<FormGroup<ITaskForm>>>();
}
