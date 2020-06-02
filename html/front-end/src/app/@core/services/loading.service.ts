import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingData } from '../models/load-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingObject$ = new BehaviorSubject<LoadingData>(null);

  get loadingObserable() {
    return this.loadingObject$.asObservable();
  }

  show(data?: LoadingData | string) {
    if (!data) {
      this.loadingObject$.next({
        show: true,
        text: '',
      });
    } else if (typeof data === 'string' || data instanceof String) {
      this.loadingObject$.next({
        show: true,
        text: data as string,
      });
    } else {
      this.loadingObject$.next({
        ...data,
        show: true,
      });
    }
  }

  hide() {
    this.loadingObject$.next({
      show: false,
    });
  }
}


