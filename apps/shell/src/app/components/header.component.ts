import { Component, inject, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Data,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ShellButtonConfigType } from '@org/my-lib/types';
import { nonAuthenticated } from '../config';

@Component({
  imports: [
    RouterModule,
    MatButtonModule,
    RouterLinkActive,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    AsyncPipe,
  ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly injector = inject(Injector)

  readonly #activatedRoute = inject(ActivatedRoute);

  readonly config$: Observable<ShellButtonConfigType[]> =
    this.#activatedRoute.data.pipe(
      map((data: Data) => {
        return data['config'] ?? nonAuthenticated;
      }),
    );
}
