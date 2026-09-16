import {
  Directive,
  effect,
  ElementRef,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TaskLoadingComponent } from '../components/ui/loading/task/task-loading.component';
import { LOADER_MANAGER_SERVICE } from '@org/shared/tokens';

@Directive({
  selector: '[appTaskLoading]',
})
export class TaskLoadingDirective {
  readonly loaderManagerService = inject(LOADER_MANAGER_SERVICE);

  readonly #elementRef = inject(TemplateRef<ElementRef>);
  readonly #containerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      this.#containerRef.clear();

      if (this.loaderManagerService.loading()) {
        this.#containerRef.createComponent(TaskLoadingComponent);
      } else {
        this.#containerRef.createEmbeddedView(this.#elementRef);
      }
    });
  }
}
