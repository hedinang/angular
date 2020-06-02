import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { LoaderState } from '../models/load-data.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public static readonly STATE_STEP_TIME = 500;
  public static readonly STATE_MAX = 5000;

  private readonly loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  private startLoading: number;
  private state: number;
  constructor() {
    interval(500).subscribe(x => {
      if (this.startLoading) {
        const currentTime = new Date().getTime();
        this.state = Math.floor((currentTime - this.startLoading) / LoaderService.STATE_STEP_TIME) + 1;
        if (this.state) {
          this.loaderSubject.next({ show: true, state: this.state });
        }
        if (this.state > LoaderService.STATE_MAX) {
          this.hide();
        }
      }
    });
  }
  show(immediately?: boolean) {
    if (!this.startLoading) {
      this.startLoading = new Date().getTime() - (immediately ? 20000 : 0);
      this.state = immediately ? 1 : 0;
    }
    this.loaderSubject.next({ show: true, state: this.state });
  }
  hide() {
    this.startLoading = null;
    this.loaderSubject.next({ show: false });
  }
}


