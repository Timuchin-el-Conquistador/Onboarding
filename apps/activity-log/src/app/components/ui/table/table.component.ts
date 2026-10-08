import {
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  IDummyData,
  dummyData,
  IPaginatedResponse,
  FORM,
  IForm,
} from '../../../models';
import { MultiSelectComponent } from '../multiselect/multiselect.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { DYNAMIC_FORM_FACTORY } from '@org/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

/**
 * @title Styling columns using their auto-generated column names
 */
@Component({
  selector: 'app-ui-table',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MultiSelectComponent,
    PaginatorComponent,
    ReactiveFormsModule,
  ],
})
export class TableComponent {
  readonly form = inject(DYNAMIC_FORM_FACTORY).createForm<IForm>(FORM);

  readonly paginator = viewChild<MatPaginator>(MatPaginator);
  readonly table = viewChild<ElementRef<HTMLElement>>('table');

  readonly pagination = toSignal(
    this.form.controls.pagination.valueChanges.pipe(
      tap(() => {
        this.table()?.nativeElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }),
    ),
    {
      initialValue: this.form.getRawValue().pagination,
    },
  );

  readonly startIndex = computed<number>(
    () => (this.pagination().page - 1) * this.pagination().pageSize,
  );

  readonly endIndex = computed<number>(
    () => this.startIndex() + this.pagination().pageSize,
  );

  readonly visibleItems = computed<IPaginatedResponse<IDummyData>>(() => ({
    items: dummyData.slice(this.startIndex(), this.endIndex()),
    total: dummyData.length,
  }));

  readonly dataSource = computed<MatTableDataSource<IDummyData>>(() => {
    return new MatTableDataSource<IDummyData>(this.visibleItems().items);
  });

  readonly displayedColumns: string[] = ['position', 'name', 'date', 'info'];

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator();
  }
}
