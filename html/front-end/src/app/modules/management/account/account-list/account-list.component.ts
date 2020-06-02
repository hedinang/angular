import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { Account } from '../../../../@core/models/account.model';
import { AccountService } from '../../../../@core/services/account.service';
import { DialogConfirmComponent } from '../../../../@share/components/dialog-confirm/dialog-confirm.component';
import { AccountEditComponent } from '../account-edit/account-edit.component';
import { DataSearchRequest } from '../../../../@core/models/data-search.model';
import { PartnerService } from '../../../../@core/services/partner.service';
import { Partners } from '../../../../@core/models/partners.model';
import { GroupAccount } from '../../../../@core/models/group-user.model';
import { GroupAccountService } from '../../../../@core/services/group-account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent extends AbstractBaseComponent implements OnInit {
  partner: Partners;
  userName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  groupAccount: GroupAccount;

  accountSelected: Account = new Account();
  listAccount: Account[];
  listPartners: Partners[];
  listGroupAccount: GroupAccount[];

  keyForSorts = ['partner', 'userName', 'displayName', 'email', 'phoneNumber', 'groupUserId'];
  constructor(
    injector: Injector,
    protected readonly accountService: AccountService,
    protected readonly partnerService: PartnerService,
    protected readonly groupAccountService: GroupAccountService,
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.getListAccount();
    this.reloadList();
    await this.getListParter();
    await this.getListGroupAccount();
  }

  async getListParter() {
    const resp = await this.partnerService.getAllPartner().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listPartners = resp;
    }
  }

  async getListGroupAccount() {
    const resp = await this.groupAccountService.getAllGroupAccount().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listGroupAccount = resp;
    }
  }
  getListAccount() {
    this.loadingService.show();
    const dataSearch = new DataSearchRequest(this.currentPage, this.itemsPerPage);
    this.accountService.getListAccountByPage(dataSearch).subscribe((res) => {
      this.loadingService.hide();
      this.enableAddButton = true;
      this.listAccount = res.list;
      this.totalItems = res.total;
    });
  }

  search(key: string) {
    let value: string | number = null;

    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.userName);
    }

    if (key === this.keyForSorts[2]) {
      value = this.initValueAndKeySort(this.keyForSorts[2], this.displayName);
    }

    if (key === this.keyForSorts[3]) {
      value = this.initValueAndKeySort(this.keyForSorts[3], this.email);
    }

    if (key === this.keyForSorts[4]) {
      value = this.initValueAndKeySort(this.keyForSorts[4], this.phoneNumber);
    }

    let partner: Partners;
    if (key === this.keyForSorts[0]) {
      partner = this.partner;
    }
    let groupAccount: GroupAccount;
    if (key === this.keyForSorts[5]) {
      groupAccount = this.groupAccount;
    }

    // TODO: Excute search

    if (value !== null || value !== undefined || value !== '') {
      this.getListAccount();
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.userName = null;
      this.displayName = null;
      this.email = null;
      this.phoneNumber = null;
    }
    if (key === this.keyForSorts[1]) {
      this.displayName = null;
      this.email = null;
      this.phoneNumber = null;
    }
    if (key === this.keyForSorts[2]) {
      this.userName = null;
      this.email = null;
      this.phoneNumber = null;
    }
    if (key === this.keyForSorts[3]) {
      this.userName = null;
      this.displayName = null;
      this.phoneNumber = null;
    }

    if (key === this.keyForSorts[4]) {
      this.userName = null;
      this.displayName = null;
      this.email = null;
    }
  }

  onChangePage(event: number) {
    this.accountSelected = new Account();
    this.currentPage = event;
    this.firstIdOfPage = this.currentPage * this.itemsPerPage;
    this.search(this.keySort);
  }

  selectedAccount(account: Account) {
    this.enableEditButton = true;
    this.accountSelected = account;
  }

  addAccount() {
    this.bsModalService.show(AccountEditComponent, {
      initialState: {
        account: null,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  editAccount(account: Account) {
    this.bsModalService.show(AccountEditComponent, {
      initialState: {
        account,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  deleteAccount(account: Account) {
    this.bsModalService.show(DialogConfirmComponent, {
      initialState: {
        title: this.getValueFromKeyTranslate('body.manager-system.account.control.delete.title'),
        message: this.getValueFromKeyTranslate('body.manager-system.account.control.delete.message'),
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        if (!account.isActive) {
          this.accountService.deleteAccount(account.code).subscribe((resp) => {
            this.showToarst(resp, 'delete', 'body.manager-system.account.translate');
          });
        } else {
          this.toastr.error(
            this.getValueFromKeyTranslate('body.manager-system.account.toast.error-status'),
            this.getValueFromKeyTranslate('body.toastr.unsuccess'),
          );
        }
      }
    });
  }
}
