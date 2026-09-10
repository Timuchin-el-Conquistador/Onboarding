import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TodoLoadingComponent } from '../components/ui/loading/todo/todo-loading.component';
import { TaskLoadingComponent } from '../components/ui/loading/task/task-loading.component';
import { SkeletonType } from '../types';

@Directive({
  selector: '[appTodoLoading]',
})
export class TodoLoadingDirective {
  readonly #elementRef = inject(TemplateRef);
  readonly #containerRef = inject(ViewContainerRef);

  readonly loading = input.required<boolean>({
    alias: 'appTodoLoading',
  });

  readonly loader = input.required<SkeletonType>({
    alias: 'appTodoLoadingLoader',
  });

  constructor() {
    effect(() => {
      this.#containerRef.clear();

      if (this.loading()) {
        this.#containerRef.createComponent(
          this.loader() === 'todo'
            ? TodoLoadingComponent
            : TaskLoadingComponent,
        );
      } else {
        this.#containerRef.createEmbeddedView(this.#elementRef);
      }
    });
  }
}
