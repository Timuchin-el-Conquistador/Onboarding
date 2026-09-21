import { Injectable } from '@angular/core';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { IOptions, ITodo, IBody } from '../models';
import { Observable } from 'rxjs';
import { ENDPOINTS_CONFIG } from '../config/endpoints.config';

@Injectable()
export class TaskManagerService<
  T extends ITodo,
> extends BaseResourceManagerService<T> {
  create(body: IBody, options?: IOptions): Observable<T> {
    const config = this.createRequestConfig(options);

    return this.http.post<T>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.CREATE_TASK}`,
      body,
      config,
    );
  }

  delete(options?: IOptions): Observable<string> {
    const config = this.createRequestConfig(options);

    return this.http.delete<string>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.DELETE_TASK}`,
      config,
    );
  }

  override update(body: IBody, options?: IOptions): Observable<T> {
    const config = this.createRequestConfig(options);

    return this.http.post<T>(
      `${this.baseUrl}/${ENDPOINTS_CONFIG.EDIT_TASK}`,
      body,
      config,
    );
  }
}
