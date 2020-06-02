import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSearchResponse, DataSearchRequest } from '../models/data-search.model';
import { Account } from '../models/account.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getListAccountByPage(dataSearchRequest: DataSearchRequest): Observable<DataSearchResponse> {
    this.requestOptions.data = dataSearchRequest;
    return this.httpService.post('users/page', this.requestOptions);
  }
  createAccount(account: Account): Observable<Account> {
    this.requestOptions.data = account;
    return this.httpService.post('users', this.requestOptions);
  }
  updateAccount(account: Account): Observable<Account> {
    this.requestOptions.data = account;
    return this.httpService.put('users/' + account.id, this.requestOptions);
  }

  deleteAccount(code: string): Observable<boolean> {
    this.resetRequest();
    return this.httpService.delete('users/' + code, this.requestOptions);
  }
}
