import { inject, Injectable } from '@angular/core';
import { IHistoryBody } from '../models';
import { Observable } from 'rxjs';
import { HISTORY_ENDPOINT } from '../config/endpoints.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared';

type HistoryCreateResponseType = { created: true };

@Injectable({ providedIn: 'root' })
export class HistoryManagerService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(API_URL_TOKEN);

  create(body: IHistoryBody): Observable<HistoryCreateResponseType> {
    return this.#http.post<HistoryCreateResponseType>(
      `${this.#baseUrl}/${HISTORY_ENDPOINT}`,
      body,
    );
  }
}
