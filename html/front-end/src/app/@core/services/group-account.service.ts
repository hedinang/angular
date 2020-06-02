import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { GroupAccount } from '../models/group-user.model';
import { DataSearchResponse, DataSearchRequest } from '../models/data-search.model';

@Injectable({
  providedIn: 'root',
})
export class GroupAccountService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllGroupAccount(): Observable<GroupAccount[]> {
    this.resetRequest();
    return this.httpService.post('groups/all', this.requestOptions);
  }

  getGroupAccountByPage(dataSearchRequest: DataSearchRequest): Observable<DataSearchResponse> {
    this.requestOptions.data = dataSearchRequest;
    return this.httpService.post('groups/page', this.requestOptions);
  }

  getGroupAccountById(id: number): Observable<GroupAccount> {
    this.resetRequest();
    return this.httpService.get('groups/' + id, this.requestOptions);
  }

  createGroupAccount(groupAccount: GroupAccount): Observable<GroupAccount> {
    this.requestOptions.data = groupAccount;
    return this.httpService.post('groups', this.requestOptions);
  }
  updateGroupAccount(groupAccount: GroupAccount): Observable<GroupAccount> {
    this.requestOptions.data = groupAccount;
    return this.httpService.put('groups/' + groupAccount.id, this.requestOptions);
  }
  deleteGroupAccount(id: number): Observable<boolean> {
    this.resetRequest();
    return this.httpService.delete('groups/' + id, this.requestOptions);
  }
}
