import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/ui/table/table.component';

@Component({
  imports: [TableComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
