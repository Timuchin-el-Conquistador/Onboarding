import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { APP_EVENTS, WINDOW } from '@org/shared';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../config';

@Component({
  selector: 'app-listener',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class ListenerComponent implements OnInit, OnDestroy {
  readonly activeRoute = inject(ActivatedRoute);
  readonly router = inject(Router);

  #window = inject(WINDOW);

  ngOnInit(): void {
    this.#window.addEventListener('message', this.#handleMessage);
  }

  ngOnDestroy(): void {
    this.#window.removeEventListener('message', this.#handleMessage);
  }

  #handleMessage = (event: MessageEvent): void => {
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
  };
}
