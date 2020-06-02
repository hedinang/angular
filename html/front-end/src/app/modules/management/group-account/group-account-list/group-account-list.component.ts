import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { GroupAccountService } from '../../../../@core/services/group-account.service';
import { DataSearchRequest } from '../../../../@core/models/data-search.model';
import { GroupAccount } from '../../../../@core/models/group-user.model';
import { GroupAccountEditComponent } from '../group-account-edit/group-account-edit.component';
import { DialogConfirmComponent } from '../../../../@share/components/dialog-confirm/dialog-confirm.component';
import { GroupAccountPermistionComponent } from '../group-account-permistion/group-account-permistion.component';

@Component({
  selector: 'app-group-account-list',
  templateUrl: './group-account-list.component.html',
  styleUrls: ['./group-account-list.component.scss'],
})
export class GroupAccountListComponent extends AbstractBaseComponent implements OnInit {
  name: string;
  code: string;
  description: string;

  listGroupAccount: GroupAccount[];
  groupAccountSelected: GroupAccount = new GroupAccount();
  enableAddButton = false;
  enableEditButton = false;
  enableOptionButton = false;

  keyForSorts = ['name', 'code', 'description'];
  constructor(injector: Injector, private readonly groupAccountService: GroupAccountService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getListGroup();
    this.reloadList();
  }

  getListGroup() {
    this.loadingService.show();
    const dataSearch = new DataSearchRequest(this.currentPage, this.itemsPerPage);
    this.groupAccountService.getGroupAccountByPage(dataSearch).subscribe((res) => {
      this.loadingService.hide();
      this.enableAddButton = true;
      this.listGroupAccount = res.list;
      this.totalItems = res.total;
    });
  }

  search(key: string) {
    let value: string | number = null;
    if (key === this.keyForSorts[0]) {
      value = this.initValueAndKeySort(this.keyForSorts[0], this.name);
    }

    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.code);
    }

    if (key === this.keyForSorts[2]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.description);
    }

    // TODO: Search
    if (value !== null || value !== undefined || value !== '') {
      this.getListGroup();
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.description = null;
      this.code = null;
    }
    if (key === this.keyForSorts[1]) {
      this.name = null;
      this.description = null;
    }
  }

  onChangePage(event: number) {
    this.groupAccountSelected = new GroupAccount();
    this.currentPage = event;
    this.firstIdOfPage = this.currentPage * this.itemsPerPage;
    this.search(this.keySort);
  }

  selectGroupAccount(groupAccount: GroupAccount) {
    this.enableEditButton = true;
    this.enableOptionButton = true;
    this.groupAccountSelected = groupAccount;
  }

  addGroupAccount() {
    this.bsModalService.show(GroupAccountEditComponent, {
      initialState: {
        groupAccount: null,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  editGroupAccount(groupAccount: GroupAccount) {
    this.bsModalService.show(GroupAccountEditComponent, {
      initialState: {
        groupAccount,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  deleteGroupAccount(groupAccount: GroupAccount) {
    this.bsModalService.show(DialogConfirmComponent, {
      initialState: {
        title: this.getValueFromKeyTranslate('body.manager-system.group-account.control.delete.title'),
        message: this.getValueFromKeyTranslate('body.manager-system.group-account.control.delete.message'),
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        this.groupAccountService.deleteGroupAccount(groupAccount.id).subscribe((resp: boolean) => {
          this.showToarst(resp, 'delete', 'body.manager-system.group-account.translate');
        });
      }
    });
  }

  permisstionEdit(groupAccount: GroupAccount) {
    this.bsModalService.show(GroupAccountPermistionComponent, {
      initialState: {
        groupAccount
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
}
