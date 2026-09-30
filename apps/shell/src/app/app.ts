import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseEventManagerService } from '@org/shared';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy, OnInit {
  #eventManager = inject(BaseEventManagerService);

  ngOnInit(): void {
    this.#eventManager.subscribe()
  }

  ngOnDestroy(): void {
    this.#eventManager.clean();
  }
}
