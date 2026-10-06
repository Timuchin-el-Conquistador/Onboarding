import { Component, DestroyRef, inject, signal } from '@angular/core';
import { APP_EVENTS, BaseEventManagerService, WINDOW } from '@org/shared';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AppRoutes } from '../config';
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService, withToaster } from '@org/my-lib/interceptors';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SUCCESS_MESSAGES } from '../models';
import { withLoading } from '../operators';
import { UserIdentityManager } from '../services';

@Component({
  selector: 'app-listener',
  imports: [
    RouterOutlet,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './listener.component.html',
  styleUrl: './listener.component.scss',
})
export class ListenerComponent {
  readonly loading = signal(false);

  readonly activeRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly toaster = inject(ToasterService);

  readonly #window = inject(WINDOW);
  readonly #destroyRef = inject(DestroyRef);
  readonly #userIdentityManager = inject(UserIdentityManager);
  readonly #eventManager = inject(BaseEventManagerService);

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
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        withLoading(this.loading),
        withToaster(this.toaster, SUCCESS_MESSAGES.LOGOUT),
      )
      .subscribe(() => {
        this.#eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGGED_OUT);
      });
  }
}
