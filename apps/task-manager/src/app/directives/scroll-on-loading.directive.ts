import {
  Directive,
  effect,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';
import { LOADER_MANAGER_SERVICE } from '@org/shared';

@Directive({
  selector: '[appScrollOnLoading]',
})
export class ScrollOnLoadingDirective {
  readonly #renderer = inject(Renderer2);
  readonly #host = inject(ElementRef<HTMLElement>);
  readonly #loader = inject(LOADER_MANAGER_SERVICE);

  constructor() {
    effect(() => {
      const host = this.#host.nativeElement;

      if (this.#loader.loading()) {
        this.#renderer.addClass(host, 'skeleton--display');
      } else {
        this.#renderer.removeClass(host, 'skeleton--display');
      }

      host.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }
}
