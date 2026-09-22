import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBody, ITodo, IConfig } from '../models';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { BASE_ENDPOINT } from '../config/endpoints.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared';

@Injectable({ providedIn: 'root' })
export class TodoManagerService<
  T extends ITodo,
> implements BaseResourceManagerService<T> {
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  create(body: IBody, config?: IConfig): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${BASE_ENDPOINT}`, body, config);
  }

  delete(config?: IConfig): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${BASE_ENDPOINT}`, config);
  }
}
