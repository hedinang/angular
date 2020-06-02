import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}
  readCookie(cname: string) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (const item of ca) {
      let c = item;
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  createCookie(name: string, value: string, exdays: number) {
    const d = new Date();
    if (exdays !== null || exdays !== undefined ) {
      exdays = 30;
    }
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }
  deleteCookie(name: string) {
    document.cookie = name + '=;';
  }
  eraseCookie(cname: string) {
    this.createCookie(cname, '', -1);
  }

  clearAll() {
    const cookies = document.cookie.split(';');

    for (const item of cookies) {
      const cookie = item;
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}
