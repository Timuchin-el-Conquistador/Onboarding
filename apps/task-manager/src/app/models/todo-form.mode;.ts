import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ITodoForm {
  title: FormControl<string>;
}

export interface ITaskForm {
  id: FormControl<number>;
  title: FormControl<string>;
  completed: FormControl<boolean>;
}

export interface ITodoListForm {
  id: FormControl<number>;
  title: FormControl<string>;
  tasks: FormArray<FormGroup<ITaskForm>>;
}
