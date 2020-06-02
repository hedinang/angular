import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../../@core/services/loading.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AbstractBaseComponent implements OnInit {
  isCollapsed = true;
  userName: string;
  isLogin: boolean;
  url: string;
  languages: string[] = [];
  languageSelected: string;
  constructor(injector: Injector, private readonly translate: TranslateService) {
    super(injector);
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.url = event.url;
    });
    this.initLanguages();
    this.languageSelected = localStorage.getItem('language');
  }

  initLanguages() {
    this.languages.push('vi');
    this.languages.push('en');
  }
  ngOnInit(): void {
    this.userName = this.authenticationService.getDisplayName();
    this.isLogin = this.authenticationService.isLogin();
  }

  changeLanguage() {
    this.translate.setDefaultLang(this.languageSelected);
    this.loadingService.hide();
    localStorage.setItem('language', this.languageSelected);
    location.reload();
  }
  onLogout() {
    this.authenticationService.logOut();
  }
}
