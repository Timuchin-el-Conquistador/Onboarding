import { Component, computed, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  APP_EVENTS,
  AuthService,
  BaseEventManagerService,
  ShellRoutes,
} from '@org/shared';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    RouterModule,
    MatButtonModule,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
  ],
  selector: 'app-listener',
  templateUrl: './listener.component.html',
  styleUrl: './listener.component.scss',
})
export class ListenerComponent {
  readonly isAuthenticated = computed(() =>
    this.#authService.isAuthenticated(),
  );
  readonly eventManager = inject(BaseEventManagerService);
  readonly router = inject(Router);

  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);
  readonly #eventManager = inject(BaseEventManagerService);

  ngOnInit(): void {
    this.#eventManager.events$
      .pipe(takeUntilDestroyed(this.#destroyRef), distinctUntilChanged())
      .subscribe((message) => {
        switch (message) {
          case APP_EVENTS.AUTH_USER_LOGGED_IN:
            this.#authService.isAuthenticated.set(true);
            this.router.navigate([ShellRoutes.Dashboard]);
            break;

          case APP_EVENTS.AUTH_USER_LOGOUT:
            this.router.navigate([ShellRoutes.Auth]);
            break;

          case APP_EVENTS.AUTH_USER_LOGGED_OUT:
            this.#authService.isAuthenticated.set(false);
            break;
        }
      });
  }

  logout(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGOUT);
  }

  login(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGIN);
  }

  register(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_SIGNUP);
  }
}
