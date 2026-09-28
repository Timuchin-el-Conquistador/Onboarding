import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutes, LOADER_MANAGER_SERVICE } from '@org/shared';
import { UserIdentityManager } from '../services';
import { ToasterService, withToaster } from '@org/my-lib/services';
import { SUCCESS_MESSAGES } from '../models';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-logout-page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutPageComponent implements OnInit {
  readonly appRoute = AppRoutes;

  readonly toaster = inject(ToasterService);
  readonly loader = inject(LOADER_MANAGER_SERVICE);

  readonly #destroyRef = inject(DestroyRef);
  readonly #userIdentityManager = inject(UserIdentityManager);

  ngOnInit(): void {
    firstValueFrom(
      this.#userIdentityManager
        .logout()
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          withToaster(this.toaster, SUCCESS_MESSAGES.LOGOUT),
        ),
    );
  }
}
