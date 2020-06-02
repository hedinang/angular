import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { PermissionsService } from '../../../../@core/services/permissions.service';
import { GroupAccountService } from '../../../../@core/services/group-account.service';
import { GroupAccount } from '../../../../@core/models/group-user.model';
import { BsModalRef } from 'ngx-bootstrap';
import { TreeviewConfig, TreeviewItem, TreeItem } from 'ngx-treeview';
import { isArrayHasData, isRealValue } from '../../../../@core/common/ultis';
import { Permisstions } from '../../../../@core/models/permisstions.model';

@Component({
  selector: 'app-group-account-permistion',
  templateUrl: './group-account-permistion.component.html',
  styleUrls: ['./group-account-permistion.component.scss'],
})
export class GroupAccountPermistionComponent extends AbstractBaseComponent implements OnInit {
  groupAccount: GroupAccount;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
  });
  constructor(
    injector: Injector,
    private readonly permisstionService: PermissionsService,
    private readonly groupAccountService: GroupAccountService,
    protected readonly bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  async ngOnInit() {
    await this.getTreePermisstions();
  }
  async setPermisstionsForGroupAccount() {
    const resp = await this.groupAccountService.getGroupAccountById(this.groupAccount.id).toPromise();
    this.loadingService.hide();
    const result: number[] = [];
    if (resp && isArrayHasData(resp.permissions)) {
      resp.permissions.forEach((item) => {
        if (isRealValue(item)) {
          result.push(item.id);
        }
      });
    }
    this.groupAccount.permissions = result;
  }

  async getTreePermisstions() {
    await this.setPermisstionsForGroupAccount();
    const resp = await this.permisstionService.getAllPermisstion().toPromise();
    this.loadingService.hide();
    const treeviewItems: TreeviewItem[] = this.convertListToTree(resp);
    this.items = treeviewItems;
  }

  convertListToTree(permistions: Permisstions[]): TreeviewItem[] {
    const treeViewsList = [];
    const treeViewItems: TreeviewItem[] = [];
    if (isArrayHasData(permistions)) {
      permistions.forEach((item) => {
        if (item.parentId === null) {
          const treeViewItem = {
            value: item,
            text: item.name,
            children: [],
            checked: false,
            collapsed: false,
            disabled: false,
          };
          treeViewsList.push(treeViewItem);
        }
      });

      permistions.forEach((item) => {
        if (item.parentId !== null) {
          treeViewsList.forEach((element) => {
            if (element.value.id === item.parentId) {
              const check = this.isCheckedPermission(item.id);
              const treeViewItem = {
                value: item,
                text: item.name,
                children: [],
                checked: check,
                collapsed: false,
                disabled: false,
              };
              element.children.push(treeViewItem);
            }
          });
        }
      });
    }

    // Convert tree to TreeViewItem []
    if (isArrayHasData(treeViewsList)) {
      treeViewsList.forEach((itemView) => {
        const treeViewItem = new TreeviewItem({
          value: itemView.value as Permisstions,
          text: itemView.text,
          children: itemView.children,
          checked: itemView.checked,
          collapsed: itemView.collapsed,
          disabled: itemView.disabled,
        } as TreeItem);
        treeViewItems.push(treeViewItem);
      });
    }
    // console.log(treeViewItems);
    return treeViewItems;
  }

  isCheckedPermission(id: number): boolean {
    if (isArrayHasData(this.groupAccount.permissions)) {
      for (const item of this.groupAccount.permissions) {
        if (item === id) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  onFilterChange(value: string) {
    // console.log('filter:', value);
  }

  onSelectChange(value: Permisstions[]) {
    const result = [];
    if (isArrayHasData(value)) {
      for (const item of value) {
        result.push(item.id);
      }
    }
    this.groupAccount.permissions = result;
  }
  onSubmit() {
    this.groupAccountService.updateGroupAccount(this.groupAccount).subscribe(res => {
      if (isRealValue(res)) {
        this.showToarst(res, 'option',
          'body.manager-system.group-account.translate',
          'body.manager-system.group-account.control.option.action-text');
        this.onClose('YES');
      }
    });
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
