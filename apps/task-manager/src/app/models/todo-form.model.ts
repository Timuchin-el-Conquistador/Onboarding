import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IForm {
  todo: FormArray<FormGroup<ITodoForm>>
}

export interface ITaskForm {
  id: FormControl<number>;
  title: FormControl<string>;
  completed: FormControl<boolean>;
}

export interface ITodoForm {
  id: FormControl<number>;
  title: FormControl<string>;
  tasks: FormArray<FormGroup<ITaskForm>>;
}
