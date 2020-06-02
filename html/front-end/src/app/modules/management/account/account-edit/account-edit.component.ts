import { Component, OnInit, Injector } from '@angular/core';
import { Account } from '../../../../@core/models/account.model';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartnerService } from '../../../../@core/services/partner.service';
import { AccountService } from '../../../../@core/services/account.service';
import { Partners } from '../../../../@core/models/partners.model';
import { GroupAccount } from '../../../../@core/models/group-user.model';
import { GroupAccountService } from '../../../../@core/services/group-account.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent extends AbstractBaseComponent implements OnInit {
  constructor(
    injector: Injector,
    protected readonly bsModalRef: BsModalRef,
    protected readonly accountService: AccountService,
    protected readonly partnerService: PartnerService,
    protected readonly groupAccountService: GroupAccountService,
  ) {
    super(injector);
    this.initForm();
  }

  account: Account;
  listPartner: Partners[];
  listGroupAccount: GroupAccount[];

  form: FormGroup;
  async ngOnInit() {
    await this.getListPartner();
    await this.getListGroupAccount();
    setTimeout(() => {
      this.initDataForm();
    }, 1000);
  }

  async getListPartner() {
    const resp = await this.partnerService.getAllPartner().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listPartner = resp;
    }
  }

  async getListGroupAccount() {
    const resp = await this.groupAccountService.getAllGroupAccount().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listGroupAccount = resp;
    }
  }

  initForm() {
    this.form = this.createForms({
      partner: new FormControl(null, Validators.compose([Validators.required])),
      userName: new FormControl(null, Validators.compose([Validators.required])),
      displayName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required])),
      phoneNumber: new FormControl(null, Validators.compose([Validators.required])),
      groupAccount: new FormControl(null, Validators.compose([Validators.required])),
      isActive: new FormControl(null, Validators.compose([Validators.required])),
    });
  }
  initDataForm() {
    if (this.account !== undefined && this.account !== null) {
      this.form.patchValue({
        partner: this.getPartNerFromAccount(this.account),
        userName: this.account.userName,
        displayName: this.account.displayName,
        email: this.account.email,
        phoneNumber: this.account.phoneNumber,
        groupAccount: this.getGroupAccountFormAccount(this.account),
        isActive: this.account.isActive,
      });
      this.UserName.disable();
      this.Partner.disable();
    } else {
      this.resetDataForm();
      this.UserName.enable();
      this.Partner.enable();
    }
  }

  resetDataForm() {
    this.form.patchValue({
      partner: null,
      userName: null,
      displayName: null,
      email: null,
      phoneNumber: null,
      groupAccount: null,
      isActive: false,
    });
  }
  get Partner() {
    return this.form.get('partner');
  }
  get UserName() {
    return this.form.get('userName');
  }
  get DisplayName() {
    return this.form.get('displayName');
  }
  get Email() {
    return this.form.get('email');
  }
  get PhoneNumber() {
    return this.form.get('phoneNumber');
  }
  get GroupAccount() {
    return this.form.get('groupAccount');
  }
  get IsActive() {
    return this.form.get('isActive');
  }

  getPartNerFromAccount(account: Account): Partners {
    let partner = new Partners();
    if (Array.isArray(this.listPartner) && this.listPartner.length > 0) {
      this.listPartner.forEach((item) => {
        if (item.id === account.partnerId) {
          partner = item;
        }
      });
    }
    return partner;
  }

  getGroupAccountFormAccount(account: Account): GroupAccount {
    let groupAccount: GroupAccount = null;
    if (Array.isArray(this.listGroupAccount) && this.listGroupAccount.length > 0) {
      this.listGroupAccount.forEach((item) => {
        if (item.id === account.groupId) {
          groupAccount = item;
        }
      });
    }
    return groupAccount;
  }
  getData() {
    if (this.account === null || this.account === undefined) {
      this.account = new Account();
    }
    this.account.partnerId = this.Partner.value.id;
    this.account.partnerName = this.Partner.value.name;
    this.account.userName = this.UserName.value;
    this.account.displayName = this.DisplayName.value;
    this.account.email = this.Email.value;
    this.account.phoneNumber = this.PhoneNumber.value;
    this.account.groupId = this.GroupAccount.value.id;
    this.account.groupName = this.GroupAccount.value.name;
    this.account.isActive = this.IsActive.value;
  }
  onSubmit() {
    this.getData();
    if (this.account.id !== null && this.account.id !== undefined) {
      this.accountService.updateAccount(this.account).subscribe((res) => {
        this.showToarst(res, 'edit', 'body.manager-system.account.translate');
        this.onClose('YES');
      });
    } else {
      this.accountService.createAccount(this.account).subscribe((res) => {
        this.showToarst(res, 'add', 'body.manager-system.account.translate');
        this.onClose('YES');
      });
    }
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
