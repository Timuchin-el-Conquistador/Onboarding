import { Component, computed, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  APP_EVENTS,
  AuthService,
  BaseEventManagerService,
  ShellRoutes,
  WINDOW,
} from '@org/shared';
import { Router } from '@angular/router';
import { filter, from, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    RouterModule,
    MatButtonModule,
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

  #window = inject(WINDOW);
  #destroyRef = inject(DestroyRef);
  #authService = inject(AuthService);

  ngOnInit(): void {
    fromEvent<MessageEvent>(this.#window, 'message')
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((event) => event.origin === this.#window.location.origin),
      )
      .subscribe((event) => {
        switch (event.data) {
          case APP_EVENTS.AUTH_USER_LOGGED_IN:
            this.#authService.isAuthenticated.set(true);
            this.router.navigate([ShellRoutes.Dashboard]);
            break;

          case APP_EVENTS.AUTH_USER_LOGGED_OUT:
            this.#authService.isAuthenticated.set(false);
            break;
        }
      });
  }

  login(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGIN);
  }

  register(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_SIGNUP);
  }

  logout(): void {
    from(this.router.navigate([ShellRoutes.Auth]))
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGOUT);
      });
  }
}
