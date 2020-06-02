import { Injectable } from '@angular/core';
import { StorageCategories } from '../common/enum';
import { User } from '../models/user.model';
import { CookieService } from './cookie.service';
import { HttpService, RequestOptions } from './http.service';
import { LoginResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser = 'current-user';
  accessToken = 'access-token';
  displayName = 'display-name';
  // Set type save data
  storage: StorageCategories = StorageCategories.cookie;

  constructor(private readonly cookieService: CookieService, private readonly httpService: HttpService) { }

  private saveCredential(user: User, type: StorageCategories) {
    switch (type) {
      case StorageCategories.cookie:
        this.cookieService.createCookie(this.accessToken, user.accessToken, 1);
        this.cookieService.createCookie(this.currentUser, user.userName, 1);
        this.cookieService.createCookie(this.displayName, user.displayName, 1);
        break;
      case StorageCategories.local:
        localStorage.setItem(this.accessToken, user.accessToken);
        localStorage.setItem(this.currentUser, user.userName);
        localStorage.setItem(this.displayName, user.displayName);
        break;
      case StorageCategories.session:
        sessionStorage.setItem(this.accessToken, user.accessToken);
        sessionStorage.setItem(this.currentUser, user.userName);
        localStorage.setItem(this.displayName, user.displayName);
        break;
    }
  }

  isLogin() {
    return !!this.getAccessToken();
  }

  getCurrentUser(): string {
    let user: string = null;
    switch (this.storage) {
      case StorageCategories.cookie:
        user = this.cookieService.readCookie(this.currentUser);
        break;
      case StorageCategories.local:
        user = localStorage.getItem(this.currentUser);
        break;
      case StorageCategories.session:
        user = sessionStorage.getItem(this.currentUser);
        break;
    }
    return user;
  }

  getAccessToken(): string {
    let token: string = null;
    switch (this.storage) {
      case StorageCategories.cookie:
        token = this.cookieService.readCookie(this.accessToken);
        break;
      case StorageCategories.local:
        token = localStorage.getItem(this.accessToken);
        break;
      case StorageCategories.session:
        token = sessionStorage.getItem(this.accessToken);
        break;
    }
    return token;
  }

  getDisplayName(): string {
    let displayName: string = null;
    switch (this.storage) {
      case StorageCategories.cookie:
        displayName = this.cookieService.readCookie(this.displayName);
        break;
      case StorageCategories.local:
        displayName = localStorage.getItem(this.displayName);
        break;
      case StorageCategories.session:
        displayName = sessionStorage.getItem(this.displayName);
        break;
    }
    return displayName;
  }
  login(path: string, userName: string, password: string) {
    const requestOptions: RequestOptions = {
      data: { userName, password }, hideLoading: false
    };
    this.httpService.post(path, requestOptions).subscribe((resp: LoginResponse) => {
      const user: User = { userName: resp.userName, accessToken: resp.token, displayName: resp.displayName };
      this.saveCredential(user, this.storage);
    });
  }

  logOut() {
    this.cookieService.eraseCookie(this.accessToken);
    this.cookieService.eraseCookie(this.currentUser);
    this.cookieService.eraseCookie(this.displayName);
    localStorage.removeItem(this.accessToken);
    localStorage.removeItem(this.currentUser);
    localStorage.removeItem(this.displayName);
    sessionStorage.removeItem(this.accessToken);
    sessionStorage.removeItem(this.currentUser);
    sessionStorage.removeItem(this.displayName);
  }
}
