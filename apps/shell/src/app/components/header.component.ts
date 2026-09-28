import { Component, inject } from '@angular/core';
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
import { ButtonConfigType } from '@org/shared';
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
  #activatedRoute = inject(ActivatedRoute);

  readonly config$: Observable<ButtonConfigType[]> =
    this.#activatedRoute.data.pipe(
      map((data: Data) => {
        return data['config'] ?? nonAuthenticated;
      }),
    );
}
