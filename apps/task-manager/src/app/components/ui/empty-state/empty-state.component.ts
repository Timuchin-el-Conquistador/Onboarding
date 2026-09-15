import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  inject,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent implements AfterContentInit {
  readonly #renderer = inject(Renderer2);

  @ContentChild('p')
  readonly elementRef!: ElementRef<HTMLElement>;

  ngAfterContentInit(): void {
    this.#renderer.addClass(this.elementRef.nativeElement, 'empty-state__p');
  }
}
