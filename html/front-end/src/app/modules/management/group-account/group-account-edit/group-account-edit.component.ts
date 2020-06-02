import { async } from '@angular/core/testing';
import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { GroupAccount } from '../../../../@core/models/group-user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { GroupAccountService } from '../../../../@core/services/group-account.service';
import { isArrayHasData, isRealValue } from '../../../../@core/common/ultis';

@Component({
  selector: 'app-group-account-edit',
  templateUrl: './group-account-edit.component.html',
  styleUrls: ['./group-account-edit.component.scss']
})
export class GroupAccountEditComponent extends AbstractBaseComponent implements OnInit {

  groupAccount: GroupAccount;
  form: FormGroup;
  constructor(injector: Injector, protected readonly bsModalRef: BsModalRef, private readonly groupAccountService: GroupAccountService) {
    super(injector);
    this.initForm();
  }

  ngOnInit() {
    setTimeout(() => {
      this.initDataForm();
    }, 1000);
  }

  initForm() {
    this.form = this.createForms({
      name: new FormControl(null, Validators.compose([Validators.required])),
      code: new FormControl(null, Validators.compose([Validators.required])),
      descriptions: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  initDataForm() {
    if (this.groupAccount !== undefined && this.groupAccount !== null) {
      this.form.patchValue({
        name: this.groupAccount.name,
        code: this.groupAccount.code,
        descriptions: this.groupAccount.descriptions,
      });
      this.getPermisstionOfGroup();
    } else {
      this.resetFormData();
    }
  }

  getPermisstionOfGroup() {
    if (this.groupAccount && this.groupAccount.id) {
      const result = [];
      this.groupAccountService.getGroupAccountById(this.groupAccount.id).subscribe(resp => {
        this.loadingService.hide();
        if (resp && isArrayHasData(resp.permissions)) {
          resp.permissions.forEach(item => {
            result.push(item.id);
          });
          this.groupAccount.permissions = result;
        }
      });
    }
  }

  resetFormData() {
    this.form.patchValue({
      name: null,
      code: null,
      descriptions: null,
    });
  }

  get Name() {
    return this.form.get('name');
  }

  get Code() {
    return this.form.get('code');
  }

  get Descriptions() {
    return this.form.get('descriptions');
  }

  getData() {
    if (this.groupAccount === null || this.groupAccount === undefined) {
      this.groupAccount = new GroupAccount();
      this.groupAccount.permissions = [];
    }
    this.groupAccount.name = this.Name.value;
    this.groupAccount.code = this.Code.value;
    this.groupAccount.descriptions = this.Descriptions.value;
  }
  onSubmit() {
    this.getData();
    if (this.groupAccount.id !== undefined && this.groupAccount.id !== null) {
      this.groupAccountService.updateGroupAccount(this.groupAccount).subscribe((res) => {
        this.showToarst(res, 'edit', 'body.manager-system.group-account.translate');
        this.onClose('YES');
      });
    } else {
      this.groupAccountService.createGroupAccount(this.groupAccount).subscribe((res) => {
        this.showToarst(res, 'add', 'body.manager-system.group-account.translate');
        this.onClose('YES');
      });
    }
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }

}
