import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Permisstions } from '../models/permisstions.model';
import { Observable } from 'rxjs';
import { DataSearchRequest, DataSearchResponse } from '../models/data-search.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getPermissionsById(id: number): Observable<Permisstions> {
    this.resetRequest();
    return this.httpService.get('permissions/' + id, this.requestOptions);
  }

  getPermisstionByPage(dataSearchRequest: DataSearchRequest): Observable<DataSearchResponse> {
    this.requestOptions.data = dataSearchRequest;
    return this.httpService.post('permissions/page', this.requestOptions);
  }

  getAllPermisstion(): Observable<Permisstions[]> {
    this.resetRequest();
    return this.httpService.post('permissions/all', this.requestOptions);
  }

  createPermissions(permissions: Permisstions): Observable<Permisstions> {
    this.requestOptions.data = permissions;
    return this.httpService.post('permissions/', this.requestOptions);
  }

  updatePermissions(permissions: Permisstions): Observable<Permisstions> {
    this.requestOptions.data = permissions;
    return this.httpService.put('permissions/' + permissions.id, this.requestOptions);
  }

  deletePermissions(id: number): Observable<boolean> {
    this.resetRequest();
    return this.httpService.delete('permissions/' + id, this.requestOptions);
  }
}
