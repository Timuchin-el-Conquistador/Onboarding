import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-loading',
  templateUrl: './task-loading.component.html',
  styleUrls: ['./task-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskLoadingComponent {}
