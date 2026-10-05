import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  APP_EVENTS,
  BaseEventManagerService,
  ShellRoutes,
  WINDOW,
} from '@org/shared';
import { Router } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
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
  readonly eventManager = inject(BaseEventManagerService);
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
          case APP_EVENTS.AUTH_USER_LOGGED_IN:
            this.router.navigate([ShellRoutes.Dashboard]);
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
}
