import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends AbstractBaseComponent implements OnInit {
  isLogin: boolean;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.isLogin = this.authenticationService.isLogin();
  }
}
