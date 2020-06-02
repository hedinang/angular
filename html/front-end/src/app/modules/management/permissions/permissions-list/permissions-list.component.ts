import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { Permisstions } from '../../../../@core/models/permisstions.model';
import { PermissionsService } from '../../../../@core/services/permissions.service';
import { DataSearchRequest } from '../../../../@core/models/data-search.model';
import { PermissionsEditComponent } from '../permissions-edit/permissions-edit.component';
import { DialogConfirmComponent } from '../../../../@share/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent extends AbstractBaseComponent implements OnInit {
  code: string;
  name: string;
  descriptions: string;

  permisstionSelected: Permisstions = new Permisstions();
  listPermistions: Permisstions[];

  keyForSorts = ['code', 'name', 'descriptions'];
  constructor(injector: Injector, private readonly permisstionService: PermissionsService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getListPermissions();
    this.reloadList();
  }

  getListPermissions() {
    this.loadingService.show();
    const dataSearch = new DataSearchRequest(this.currentPage, this.itemsPerPage);
    this.permisstionService.getPermisstionByPage(dataSearch).subscribe((res) => {
      this.loadingService.hide();
      this.enableAddButton = true;
      this.listPermistions = res.list;
      this.totalItems = res.total;
    });
  }

  search(key: string) {
    let value: string | number = null;

    if (key === this.keyForSorts[0]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.code);
    }

    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[2], this.name);
    }

    if (key === this.keyForSorts[2]) {
      value = this.initValueAndKeySort(this.keyForSorts[3], this.descriptions);
    }

    // TODO: Excute search

    if (value !== null || value !== undefined || value !== '') {
      this.getListPermissions();
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.name = null;
      this.descriptions = null;
    }
    if (key === this.keyForSorts[1]) {
      this.code = null;
      this.descriptions = null;
    }
    if (key === this.keyForSorts[2]) {
      this.code = null;
      this.name = null;
    }
  }

  onChangePage(event: number) {
    this.permisstionSelected = new Permisstions();
    this.currentPage = event;
    this.firstIdOfPage = this.currentPage * this.itemsPerPage;
    this.search(this.keySort);
  }

  selectedAccount(permisstion: Permisstions) {
    this.enableEditButton = true;
    this.permisstionSelected = permisstion;
  }

  addPermissions() {
    this.bsModalService.show(PermissionsEditComponent, {
      initialState: {
        permisstion: null,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  editPermissions(permisstion: Permisstions) {
    this.bsModalService.show(PermissionsEditComponent, {
      initialState: {
        permisstion,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  deletePermissions(permisstion: Permisstions) {
    this.bsModalService.show(DialogConfirmComponent, {
      initialState: {
        title: this.getValueFromKeyTranslate('body.manager-system.permissions.control.delete.title'),
        message: this.getValueFromKeyTranslate('body.manager-system.permissions.control.delete.message'),
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        this.permisstionService.deletePermissions(permisstion.id).subscribe((resp) => {
          this.showToarst(resp, 'delete', 'body.manager-system.permissions.translate');
        });
      }
    });
  }
}
