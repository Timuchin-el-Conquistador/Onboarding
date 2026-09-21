import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOptions, IBody, ITodo } from '../models';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { BASE_ENDPOINT } from '../config/endpoints.config';

@Injectable()
export class TodoManagerService<
  T extends ITodo,
> extends BaseResourceManagerService<T> {
  create(body: IBody, options?: IOptions): Observable<T> {
    const config = this.createRequestConfig(options);

    return this.http.post<T>(`${this.baseUrl}/${BASE_ENDPOINT}`, body, config);
  }

  delete(options?: IOptions): Observable<string> {
    const config = this.createRequestConfig(options);

    return this.http.delete<string>(`${this.baseUrl}/${BASE_ENDPOINT}`, config);
  }
}
