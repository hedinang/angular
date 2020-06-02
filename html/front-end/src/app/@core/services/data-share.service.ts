import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  dataShare$ = new BehaviorSubject<any>({});
  constructor() { }

  send(data: any) {
    return this.dataShare$.next(data);
  }
  receive() {
    return this.dataShare$;
  }

}
