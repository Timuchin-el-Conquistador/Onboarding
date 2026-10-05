import { inject, Injectable } from '@angular/core';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { ITodo, IBody, IConfig } from '../models';
import { Observable } from 'rxjs';
import { ENDPOINTS_CONFIG } from '../config/endpoints.config';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared';

@Injectable()
export class TaskManagerService<
  T extends ITodo,
> implements BaseResourceManagerService<T> {
  readonly http = inject(HttpClient);
  readonly baseUrl = inject(API_URL_TOKEN);

  create(body: IBody, config?: IConfig): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.CREATE_TASK}`,
      body,
      config,
    );
  }

  delete(config?: IConfig): Observable<T> {
    return this.http.delete<T>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.DELETE_TASK}`,
      config,
    );
  }

  update(body: IBody, config?: IConfig): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.EDIT_TASK}`,
      body,
      config,
    );
  }
}
