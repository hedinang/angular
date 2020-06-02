import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../@core/base/base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractBaseComponent implements OnInit {
  form: FormGroup;
  constructor(injector: Injector) {
    super(injector);
    this.init();
  }

  init() {
    this.form = this.createForms({
      userName: new FormControl(null, Validators.compose([Validators.required])),
      passWord: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  get UserName() {
    return this.form.get('userName');
  }

  get PassWord() {
    return this.form.get('passWord');
  }

  ngOnInit(): void {}

  onLogin() {
    this.authenticationService.login('auth/login', this.UserName.value, this.PassWord.value);
    setTimeout(() => {
      this.navigate(['/home']).catch((err) => {
        console.log('Authorization fail, Please Login');
      });
    }, 1000);
  }
}
