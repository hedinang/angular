import { Injectable, Injector } from '@angular/core';
import { RequestOptions, HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected requestOptions: RequestOptions;
  protected httpService: HttpService;
  constructor(protected injector: Injector) {
    this.httpService = this.injector.get(HttpService);
    this.resetRequest();
  }
  resetRequest() {
    this.requestOptions = { data: {}, hideLoading: true };
  }
}
