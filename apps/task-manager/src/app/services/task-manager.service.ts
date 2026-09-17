import { inject, Injectable } from '@angular/core';
import { BaseResourceManagerService } from './base-resource-manager.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN } from '@org/shared/tokens';
import { CrudOptions, ITodo, IBody, ITaskManager } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService<T extends ITodo>
  extends BaseResourceManagerService<T>
  implements ITaskManager
{
  constructor() {
    super(inject(HttpClient), inject(API_URL_TOKEN));
  }

  update(suffix: string, body: IBody, options?: CrudOptions): Observable<T> {
    const config = this.createRequestConfig(options);

    return this.http.post<T>(`${this.baseUrl}/${suffix}`, body, config);
  }
}
