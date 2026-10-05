import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class ListenerComponent implements OnInit, OnDestroy {
  readonly eventManager = inject(BaseEventManagerService);
  readonly router = inject(Router);

  #window = inject(WINDOW);

  ngOnInit(): void {
    this.#window.addEventListener('message', this.#handleMessage);
  }

  ngOnDestroy(): void {
    this.#window.removeEventListener('message', this.#handleMessage);
  }

  login(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_LOGIN);
  }

  register(): void {
    this.eventManager.dispatch(APP_EVENTS.AUTH_USER_SIGNUP);
  }

  #handleMessage = (event: MessageEvent): void => {
    switch (event.data) {
      case APP_EVENTS.AUTH_USER_LOGGED_IN:
        this.router.navigate([`/${ShellRoutes.Dashboard}`]);
        break;
    }
  };
}
