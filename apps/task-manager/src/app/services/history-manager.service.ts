import { inject, Injectable } from '@angular/core';
import { IHistoryBody } from '../models';
import { Observable } from 'rxjs';
import { HISTORY_ENDPOINT } from '../config/endpoints.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared';

@Injectable({ providedIn: 'root' })
export class HistoryManagerService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(API_URL_TOKEN);

  create(body: IHistoryBody): Observable<{ created: true }> {
    return this.#http.post<{ created: true }>(
      `${this.#baseUrl}/${HISTORY_ENDPOINT}`,
      body,
    );
  }
}
