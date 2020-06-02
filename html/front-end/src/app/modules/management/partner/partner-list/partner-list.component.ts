import { Component, OnInit, Injector } from '@angular/core';
import { Partners } from '../../../../@core/models/partners.model';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { PartnerService } from '../../../../@core/services/partner.service';
import { DataSearchRequest } from '../../../../@core/models/data-search.model';
import { PartnerEditComponent } from '../partner-edit/partner-edit.component';
import { DialogConfirmComponent } from '../../../../@share/components/dialog-confirm/dialog-confirm.component';
import { ToastContent } from '../../../../@core/models/toast.model';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
})
export class PartnerListComponent extends AbstractBaseComponent implements OnInit {
  name: string;
  description: string;
  status: boolean;

  partnerSelected: Partners = new Partners();
  listPartner: Partners[];

  enableAddButton = false;
  enableEditButton = false;

  keyForSorts = ['name', 'description'];
  constructor(injector: Injector, private readonly partnerService: PartnerService) {
    super(injector);
  }

  ngOnInit(): void {
    this.getListPartner();
    this.reloadList();
  }

  getListPartner() {
    this.loadingService.show();
    const dataSearch = new DataSearchRequest(this.currentPage, this.itemsPerPage);
    this.partnerService.getListPartnerByPage(dataSearch).subscribe((res) => {
      this.loadingService.hide();
      this.enableAddButton = true;
      this.listPartner = res.list;
      this.totalItems = res.total;
    });
  }

  search(key: string) {
    let value: string | number = null;
    if (key === this.keyForSorts[0]) {
      value = this.initValueAndKeySort(this.keyForSorts[0], this.name);
    }

    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.description);
    }
    // TODO: Search
    if (value !== null || value !== undefined || value !== '') {
      this.getListPartner();
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.description = null;
    }
    if (key === this.keyForSorts[1]) {
      this.name = null;
    }
  }

  onChangePage(event: number) {
    this.partnerSelected = new Partners();
    this.currentPage = event;
    this.firstIdOfPage = this.currentPage * this.itemsPerPage;
    this.search(this.keySort);
  }

  selectPartner(partner: Partners) {
    this.enableEditButton = true;
    this.partnerSelected = partner;
  }

  addPartner() {
    this.bsModalService.show(PartnerEditComponent, {
      initialState: {
        partner: null,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  editPartner(partner: Partners) {
    this.bsModalService.show(PartnerEditComponent, {
      initialState: {
        partner,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  deletePartner(partner: Partners) {
    this.bsModalService.show(DialogConfirmComponent, {
      initialState: {
        title: this.getValueFromKeyTranslate('body.function.partner.control.delete.title'),
        message: this.getValueFromKeyTranslate('body.function.partner.control.delete.message'),
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        if (!partner.status) {
          this.partnerService.deletePartner(partner.id).subscribe((resp: boolean) => {
            this.showToarst(resp, 'delete', 'body.function.partner.translate');
          });
        } else {
          this.toastr.error(
            this.getValueFromKeyTranslate('body.function.partner.toast.error-status'),
            this.getValueFromKeyTranslate('body.toastr.unsuccess'),
          );
        }
      }
    });
  }
}
