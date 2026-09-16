import {
  Directive,
  effect,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TodoLoadingComponent } from '../components/ui/loading/todo/todo-loading.component';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';

@Directive({
  selector: '[appTodoLoading]',
})
export class TodoLoadingDirective {
  readonly loaderManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly #elementRef = inject(TemplateRef);
  readonly #containerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.#containerRef.clear();

      if (this.loaderManagerService.loading()) {
        this.#containerRef.createComponent(TodoLoadingComponent);
      } else {
        this.#containerRef.createEmbeddedView(this.#elementRef);
      }
    });
  }
}
