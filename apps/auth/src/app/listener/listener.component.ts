import { Component, DestroyRef, inject } from '@angular/core';
import { APP_EVENTS, BaseEventManagerService } from '@org/shared';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../config';
import { distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserIdentityManager } from '../services';

@Component({
  selector: 'app-listener',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class ListenerComponent {
  readonly activeRoute = inject(ActivatedRoute);
  readonly router = inject(Router);

  readonly #destroyRef = inject(DestroyRef);
  readonly #userIdentityManager = inject(UserIdentityManager);
  readonly #eventManager = inject(BaseEventManagerService);

  ngOnInit(): void {
    this.#eventManager.events$
      .pipe(takeUntilDestroyed(this.#destroyRef), distinctUntilChanged())
      .subscribe((message) => {
        switch (message) {
          case APP_EVENTS.AUTH_USER_LOGIN:
            this.router.navigate([AppRoutes.Login], {
              relativeTo: this.activeRoute,
            });
            break;

          case APP_EVENTS.AUTH_USER_LOGOUT:
            this.#logout();
            break;

          case APP_EVENTS.AUTH_USER_SIGNUP:
            this.router.navigate([AppRoutes.Register], {
              relativeTo: this.activeRoute,
            });
            break;
        }
      });
  }

  #logout(): void {
    this.#userIdentityManager
      .logout()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.#eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGGED_OUT);
      });
  }
}
