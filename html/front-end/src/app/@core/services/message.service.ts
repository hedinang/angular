import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly messageObject$ = new BehaviorSubject<any>(null);

  constructor(private readonly translateService: TranslateService) {}

  show(messageKey: string, ...params: any[]) {
    const message = this.translateService.instant(messageKey, params);
    alert(message);
  }

  getMessageObservable(): Observable<any> {
    return this.messageObject$.asObservable();
  }
  updateMessage(data: Message) {
    this.messageObject$.next(data);
  }
  clearMessage() {
    this.messageObject$.next(null);
  }
}
