import { Component, computed, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BubblePaginationDirective } from '../../../directives';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DummyData, dummyData } from '../../../models';
import { MultiSelectComponent } from '../multiselect/multiselect.component';

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
    BubblePaginationDirective,
    MultiSelectComponent,
  ],
})
export class TableComponent {
  readonly dataSource = computed<MatTableDataSource<DummyData>>(() => {
    return new MatTableDataSource<DummyData>(dummyData);
  });

  readonly displayedColumns: string[] = ['position', 'name', 'date', 'info'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
  }
}
