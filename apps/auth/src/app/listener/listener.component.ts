import { Component, DestroyRef, inject } from '@angular/core';
import { APP_EVENTS, WINDOW } from '@org/shared';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../config';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-listener',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class ListenerComponent {
  readonly activeRoute = inject(ActivatedRoute);
  readonly router = inject(Router);

  #window = inject(WINDOW);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    fromEvent<MessageEvent>(this.#window, 'message')
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((event) => event.origin === this.#window.location.origin),
      )
      .subscribe((event) => {
        switch (event.data) {
          case APP_EVENTS.AUTH_USER_LOGIN:
            this.router.navigate([AppRoutes.Login], {
              relativeTo: this.activeRoute,
            });
            break;

          case APP_EVENTS.AUTH_USER_SIGNUP:
            this.router.navigate([AppRoutes.Register], {
              relativeTo: this.activeRoute,
            });
            break;
        }
      });
  }
}
