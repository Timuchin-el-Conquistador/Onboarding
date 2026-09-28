import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppEventManager } from '@org/shared';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  #eventManager = inject(AppEventManager);

  ngOnDestroy(): void {
    this.#eventManager.clean();
  }
}
