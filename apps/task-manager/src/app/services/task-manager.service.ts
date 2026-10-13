import { inject, Injectable } from '@angular/core';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { ITodoBody, IConfig, ITodoResponse } from '../models';
import { Observable } from 'rxjs';
import { ENDPOINTS_CONFIG } from '../config/endpoints.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared';

@Injectable({ providedIn: 'root' })
export class TaskManagerService<
  T extends ITodoResponse,
> implements BaseResourceManagerService<T> {
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  create(body: ITodoBody, config?: IConfig): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${ENDPOINTS_CONFIG.CREATE_TASK}`, body, config)
  }

  delete(config?: IConfig): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${ENDPOINTS_CONFIG.DELETE_TASK}`, config)
  }

  update(body: ITodoBody, config?: IConfig): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${ENDPOINTS_CONFIG.EDIT_TASK}`, body, config)
  }
}
