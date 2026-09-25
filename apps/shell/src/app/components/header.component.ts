import { Component, inject, OnDestroy } from '@angular/core';
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
import { AppEventManager } from '../services';

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
export class HeaderComponent implements OnDestroy {
  #activatedRoute = inject(ActivatedRoute);
  #eventManager = inject(AppEventManager);

  readonly config$: Observable<ButtonConfigType[]> =
    this.#activatedRoute.data.pipe(
      map((data: Data) => {
        return data['config'] ?? nonAuthenticated;
      }),
    );

  ngOnDestroy(): void {
    this.#eventManager.clean()
  }
}
