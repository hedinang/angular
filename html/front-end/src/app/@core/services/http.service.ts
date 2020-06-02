import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

export class InterceptorHttpParams extends HttpParams {
  constructor(public options: RequestOptions) {
    super({
      fromObject: options.params as {
        [param: string]: string | string[];
      },
    });
  }
}

export interface RequestOptions {
  data?: any;
  params?: { [param: string]: string | string[] | boolean | number };
  showLoadingImmediately?: boolean;
  hideLoading?: boolean;
  ignoreError?: boolean;
  ignoreUnknowError?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * http get
   * @param path the api path
   * @param options the request options
   */
  get(path: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);

    return this.processResponse(this.httpClient.get(environment.baseApiUrl + path, requestOptions));
  }

  /**
   * http post
   * @param path the api path
   * @param options the request options
   */
  post(path: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);

    return this.processResponse(
      this.httpClient.post(environment.baseApiUrl + path, options && options.data ? options.data : null, requestOptions),
    );
  }

  /**
   * http put
   * @param path the api path
   * @param options the request options
   */
  put(path: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);
    console.log(environment.baseApiUrl + path);

    return this.processResponse(
      this.httpClient.put(environment.baseApiUrl + path, options && options.data ? options.data : null, requestOptions),
    );
  }

  /**
   * http delete
   * @param path the api path
   * @param options the request options
   */
  delete(path: string, options?: RequestOptions): Observable<any> {
    const requestOptions = this.createRequestOptions(options);

    return this.processResponse(this.httpClient.delete(environment.baseApiUrl + path, requestOptions));
  }

  jsonToFormData(json: object): FormData {
    const data = new FormData();
    for (const key of Object.keys(json)) {
      if (json[key] !== undefined && json[key] !== null) {
        if (Array.isArray(json[key])) {
          _.each(json[key], (v) => {
            data.append(`${key}[]`, v);
          });
        } else {
          data.append(key, json[key]);
        }
      }
    }

    return data;
  }

  jsonToUrlParam(json: object): string {
    const params = Object.keys(json)
      .map((key) => `${encodeURIComponent(key)} = ${encodeURIComponent(json[key])}`)
      .join('&');

    return params;
  }

  private createRequestOptions(
    options?: RequestOptions,
  ): {
    headers: null;
    params: null;
    observe: any;
  } {
    const requestOptions = {
      headers: null,
      params: null,
      observe: 'response' as any,
    };
    if (options) {
      requestOptions.params = new InterceptorHttpParams(options);
      if (options.hideLoading) {
        requestOptions.headers = new HttpHeaders({ ignoreLoadingBar: 'true' });
      }
    }

    return requestOptions;
  }

  private processResponse(responseOb: Observable<any>): Observable<any> {
    return responseOb.pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body;
        }
        throwError(response);
      }),
    );
  }
}
