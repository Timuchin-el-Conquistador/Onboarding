import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs';

@Directive({
  selector: '[appBubblePagination]',
})
export class BubblePaginationDirective implements AfterViewInit, OnChanges {
  readonly showFirstButton = input(true);
  readonly showLastButton = input(true);
  readonly renderButtonsNumber = input(2);
  readonly appCustomLength = input(0);
  readonly hideDefaultArrows = input(false);
  readonly table = input<HTMLElement>();
  readonly pageIndexChangeEmitter = output<number>();

  #dotsEndRef!: HTMLElement;
  #dotsStartRef!: HTMLElement;
  #bubbleContainerRef!: HTMLElement;
  #buttonsRef: HTMLElement[] = [];

  readonly #matPag = inject(MatPaginator, { host: true, self: true });
  readonly #elementRef = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.#styleDefaultPagination();
    this.#createBubbleDivRef();
    this.#renderButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes?.['appCustomLength']?.firstChange) {
      this.#removeButtons();
      this.#switchPage(0);
      this.#renderButtons();
    }
  }

  #renderButtons(): void {
    this.#buildButtons();

    this.#matPag.page
      .pipe(
        map((e) => [e.previousPageIndex ?? 0, e.pageIndex]),
        startWith([0, 0]),
      )
      .subscribe(([prev, curr]) => {
        this.#changeActiveButtonStyles(prev, curr);
      });
  }

  #changeActiveButtonStyles(previousIndex: number, newIndex: number) {
    const previouslyActive = this.#buttonsRef[previousIndex];
    const currentActive = this.#buttonsRef[newIndex];

    this.#renderer.removeClass(previouslyActive, 'g-bubble__active');

    this.#renderer.addClass(currentActive, 'g-bubble__active');

    this.#buttonsRef.forEach((button) =>
      this.#renderer.setStyle(button, 'display', 'none'),
    );

    const renderElements = this.renderButtonsNumber;
    const endDots = newIndex < this.#buttonsRef.length - renderElements() - 1;
    const startDots = newIndex - renderElements() > 0;

    const firstButton = this.#buttonsRef[0];
    const lastButton = this.#buttonsRef[this.#buttonsRef.length - 1];

    if (this.showLastButton()) {
      this.#renderer.setStyle(
        this.#dotsEndRef,
        'display',
        endDots ? 'block' : 'none',
      );
      this.#renderer.setStyle(lastButton, 'display', endDots ? 'flex' : 'none');
    }

    if (this.showFirstButton()) {
      this.#renderer.setStyle(
        this.#dotsStartRef,
        'display',
        startDots ? 'block' : 'none',
      );
      this.#renderer.setStyle(
        firstButton,
        'display',
        startDots ? 'flex' : 'none',
      );
    }

    const startingIndex = startDots ? newIndex - renderElements() : 0;

    const endingIndex = endDots
      ? newIndex + renderElements()
      : this.#buttonsRef.length - 1;

    for (let i = startingIndex; i <= endingIndex; i++) {
      const button = this.#buttonsRef[i];
      this.#renderer.setStyle(button, 'display', 'flex');
    }

    this.table()?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  #styleDefaultPagination() {
    const nativeElement = this.#elementRef.nativeElement;
    const itemsPerPage = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size',
    );
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label',
    );
    const previousButton = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous',
    );
    const nextButtonDefault = nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next',
    );

    this.#renderer.setStyle(itemsPerPage, 'display', 'none');

    this.#renderer.setStyle(howManyDisplayedEl, 'position', 'absolute');
    this.#renderer.setStyle(howManyDisplayedEl, 'left', '0');
    this.#renderer.setStyle(howManyDisplayedEl, 'color', '#919191');
    this.#renderer.setStyle(howManyDisplayedEl, 'font-size', '1rem');

    if (this.hideDefaultArrows()) {
      this.#renderer.setStyle(previousButton, 'display', 'none');
      this.#renderer.setStyle(nextButtonDefault, 'display', 'none');
    }
  }

  #createBubbleDivRef(): void {
    const actionContainer = this.#elementRef.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions',
    );
    const nextButtonDefault = this.#elementRef.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next',
    );

    this.#bubbleContainerRef = this.#renderer.createElement(
      'div',
    ) as HTMLElement;
    this.#renderer.addClass(this.#bubbleContainerRef, 'g-bubble-container');

    this.#renderer.insertBefore(
      actionContainer,
      this.#bubbleContainerRef,
      nextButtonDefault,
    );
  }

  #buildButtons(): void {
    const neededButtons = Math.ceil(
      this.appCustomLength() / this.#matPag.pageSize,
    );

    if (neededButtons === 1) {
      this.#renderer.setStyle(
        this.#elementRef.nativeElement,
        'display',
        'none',
      );
      return;
    }

    this.#buttonsRef = [this.#createButton(0)];

    this.#dotsStartRef = this.#createDotsElement();

    for (let index = 1; index < neededButtons - 1; index++) {
      this.#buttonsRef = [...this.#buttonsRef, this.#createButton(index)];
    }

    this.#dotsEndRef = this.#createDotsElement();

    this.#buttonsRef = [
      ...this.#buttonsRef,
      this.#createButton(neededButtons - 1),
    ];
  }

  #removeButtons(): void {
    this.#buttonsRef.forEach((button) => {
      this.#renderer.removeChild(this.#bubbleContainerRef, button);
    });

    this.#buttonsRef.length = 0;
  }

  #createButton(i: number): HTMLElement {
    const bubbleButton = this.#renderer.createElement('div');
    const text = this.#renderer.createText(String(i + 1));

    this.#renderer.addClass(bubbleButton, 'g-bubble');
    this.#renderer.setStyle(bubbleButton, 'margin-right', '0.5rem');
    this.#renderer.appendChild(bubbleButton, text);

    this.#renderer.listen(bubbleButton, 'click', () => {
      this.#switchPage(i);
    });

    this.#renderer.appendChild(this.#bubbleContainerRef, bubbleButton);

    this.#renderer.setStyle(bubbleButton, 'display', 'none');

    return bubbleButton;
  }

  #createDotsElement(): HTMLElement {
    const dotsEl = this.#renderer.createElement('span');
    const dotsText = this.#renderer.createText('.....');

    this.#renderer.setStyle(dotsEl, 'font-size', '1.125rem');
    this.#renderer.setStyle(dotsEl, 'margin-right', '0.5rem');
    this.#renderer.setStyle(dotsEl, 'padding-top', '0.375rem');
    this.#renderer.setStyle(dotsEl, 'color', '#919191');

    this.#renderer.appendChild(dotsEl, dotsText);

    this.#renderer.appendChild(this.#bubbleContainerRef, dotsEl);

    this.#renderer.setStyle(dotsEl, 'display', 'none');

    return dotsEl;
  }

  #switchPage(i: number): void {
    const previousPageIndex = this.#matPag.pageIndex;
    this.#matPag.pageIndex = i;
    this.#matPag['_emitPageEvent'](previousPageIndex);

    this.pageIndexChangeEmitter.emit(i);
  }
}
