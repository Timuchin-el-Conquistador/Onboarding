import { Component, computed, forwardRef, input, model } from '@angular/core';
import { IPaginationValue } from '../../../models';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-ui-paginator',
  styleUrl: 'paginator.component.scss',
  templateUrl: 'paginator.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginatorComponent),
      multi: true,
    },
  ],
})
export class PaginatorComponent implements ControlValueAccessor {
  readonly value = model<IPaginationValue>({ page: 1, pageSize: 10 });
  readonly total = input(10);
  readonly visibleRangeLength = input(5);
  readonly pageSizes = input<number[]>([5, 10, 25, 50]);

  readonly totalPages = computed<number>(() => {
    return Math.ceil(this.total() / this.value().pageSize);
  });

  readonly rangeStart = computed<number>(() => {
    return this.total() === 0
      ? 0
      : (this.value().page - 1) * this.value().pageSize + 1;
  });

  readonly rangeEnd = computed<number>(() => {
    const end = this.value().page * this.value().pageSize;
    return Math.min(end, this.total());
  });

  readonly visiblePages = computed<number[]>(() => {
    const length = Math.min(this.totalPages(), this.visibleRangeLength());
    const startIndex = Math.max(
      Math.min(
        this.value().page - Math.ceil(length / 2),
        this.totalPages() - length,
      ),
      0,
    );

    return Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1,
    );
  });

  onChange(value: any) {}
  onTouched() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: IPaginationValue): void {
    if (!value) return;

    this.value.set(value);
  }

  selectPage(page: number): void {
    this.value.update((state) => {
      return { ...state, page };
    });
    this.onChange(this.value());
  }

  selectPageSize(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    this.value.set({ page: 1, pageSize: +pageSize });
    this.onChange(this.value());
  }
}
