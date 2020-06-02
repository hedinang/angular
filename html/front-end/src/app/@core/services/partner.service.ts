import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { DataSearchRequest, DataSearchResponse } from '../models/data-search.model';
import { Partners } from '../models/partners.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartnerService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllPartner(): Observable<Partners[]> {
    this.resetRequest();
    return this.httpService.get('partners/all', this.requestOptions);
  }
  getListPartnerByPage(dataSearchRequest: DataSearchRequest): Observable<DataSearchResponse> {
    this.requestOptions.data = dataSearchRequest;
    return this.httpService.post('partners/page', this.requestOptions);
  }

  createPartner(partners: Partners): Observable<Partners> {
    this.requestOptions.data = partners;
    return this.httpService.post('partners', this.requestOptions);
  }

  updatePartner(partners: Partners): Observable<Partners> {
    this.requestOptions.data = partners;
    return this.httpService.put('partners/' + partners.id, this.requestOptions);
  }
  deletePartner(id: number): Observable<boolean> {
    this.resetRequest();
    return this.httpService.delete('partners/' + id, this.requestOptions);
  }
}
