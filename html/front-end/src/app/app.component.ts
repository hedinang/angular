import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Affiliate-System';
  constructor(private readonly translate: TranslateService) {
    const language = localStorage.getItem('language');
    if (language === null || language === undefined || language === ' ') {
      translate.setDefaultLang('vi');
      localStorage.setItem('language', 'vi');
    } else {
      translate.setDefaultLang(language);
    }
  }
  scrollToTop(event) {
    window.scroll(0, 0);
  }
}
