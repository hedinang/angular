import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { BsModalRef } from 'ngx-bootstrap';
import { PermissionsService } from '../../../../@core/services/permissions.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Permisstions } from '../../../../@core/models/permisstions.model';
import { isArrayHasData } from '../../../../@core/common/ultis';

@Component({
  selector: 'app-permissions-edit',
  templateUrl: './permissions-edit.component.html',
  styleUrls: ['./permissions-edit.component.scss'],
})
export class PermissionsEditComponent extends AbstractBaseComponent implements OnInit {
  constructor(injector: Injector, protected readonly bsModalRef: BsModalRef, private readonly permissionsService: PermissionsService) {
    super(injector);
    this.initForm();
  }

  permisstion: Permisstions;
  listPermisstionParent: Permisstions[];

  form: FormGroup;
  async ngOnInit() {
    await this.getListPermisstionParent();
    setTimeout(() => {
      this.initDataForm();
    }, 1000);
  }

  initForm() {
    this.form = this.createForms({
      code: new FormControl(null, Validators.compose([Validators.required])),
      name: new FormControl(null, Validators.compose([Validators.required])),
      descriptions: new FormControl(null, Validators.compose([Validators.required])),
      parent: new FormControl(null, Validators.compose([])),
    });
  }
  initDataForm() {
    if (this.permisstion !== undefined && this.permisstion !== null) {
      this.form.patchValue({
        code: this.permisstion.code,
        name: this.permisstion.name,
        descriptions: this.permisstion.descriptions,
        parent: this.getPermisstionParent(this.permisstion.parentId),
      });
    } else {
      this.resetDataForm();
    }
  }

  resetDataForm() {
    this.form.patchValue({
      code: null,
      name: null,
      descriptions: null,
      parent: null,
    });
  }
  get Code() {
    return this.form.get('code');
  }
  get Name() {
    return this.form.get('name');
  }
  get Descriptions() {
    return this.form.get('descriptions');
  }

  get Parent() {
    return this.form.get('parent');
  }

  async getListPermisstionParent() {
    const resp = await this.permissionsService.getAllPermisstion().toPromise();
    this.loadingService.hide();
    this.listPermisstionParent = [];
    if (isArrayHasData(resp)) {
      resp.forEach((item) => {
        if (item.parentId === null) {
          this.listPermisstionParent.push(item);
        }
      });
    }
  }

  getPermisstionParent(permisstionId: number): Permisstions {
    let permisstion: Permisstions = null;
    if (isArrayHasData(this.listPermisstionParent)) {
      this.listPermisstionParent.forEach((item) => {
        if (item.id === permisstionId) {
          permisstion = item;
        }
      });
    }
    return permisstion;
  }

  getData() {
    if (this.permisstion === null || this.permisstion === undefined) {
      this.permisstion = new Permisstions();
    }
    this.permisstion.code = this.Code.value;
    this.permisstion.name = this.Name.value;
    this.permisstion.descriptions = this.Descriptions.value;
    this.permisstion.parentId = this.Parent.value.id;
  }
  onSubmit() {
    this.getData();
    if (this.permisstion.id !== null && this.permisstion.id !== undefined) {
      this.permissionsService.updatePermissions(this.permisstion).subscribe((res) => {
        this.showToarst(res, 'edit', 'body.manager-system.permissions.translate');
        this.onClose('YES');
      });
    } else {
      this.permissionsService.createPermissions(this.permisstion).subscribe((res) => {
        this.showToarst(res, 'add', 'body.manager-system.permissions.translate');
        this.onClose('YES');
      });
    }
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
