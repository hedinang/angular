import { Component, OnInit, Injector } from '@angular/core';
import { Campaign } from '../../../../@core/models/campaign.model';
import { Partners } from '../../../../@core/models/partners.model';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { CampaignService } from '../../../../@core/services/campaign.service';
import { PartnerService } from '../../../../@core/services/partner.service';
import { CampaignEditComponent } from '../campaign-edit/campaign-edit.component';
import { DialogConfirmComponent } from '../../../../@share/components/dialog-confirm/dialog-confirm.component';
import { DataSearchRequest } from '../../../../@core/models/data-search.model';
import { CampaignManagerLinkComponent } from '../campaign-manager-link/campaign-manager-link.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
})
export class CampaignListComponent extends AbstractBaseComponent implements OnInit {
  partner: Partners;
  title: string;
  source: string;
  type: number;
  isPostBack: boolean | null;

  campaignSelected: Campaign = new Campaign();
  listCampaigns: Campaign[];
  listPartners: Partners[];

  keyForSorts = ['partner', 'title', 'source'];
  constructor(injector: Injector, protected readonly campaignService: CampaignService, protected readonly partnerService: PartnerService) {
    super(injector);
  }

  async ngOnInit() {
    await this.getListParter();
    this.getListCampaign();
    this.reloadList();
  }

  async getListParter() {
    const resp = await this.partnerService.getAllPartner().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listPartners = resp;
    }
  }

  getListCampaign() {
    this.loadingService.show();
    const dataSearch = new DataSearchRequest(this.currentPage, this.itemsPerPage);
    this.campaignService.getCampaignByPage(dataSearch).subscribe((res) => {
      this.loadingService.hide();
      this.enableAddButton = true;
      this.listCampaigns = res.list;
      this.totalItems = res.total;
    });
  }
  search(key: string) {
    let value: string | number = null;

    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[1], this.title);
    }

    if (key === this.keyForSorts[2]) {
      value = this.initValueAndKeySort(this.keyForSorts[2], this.source);
    }

    let partner: Partners;
    if (key === this.keyForSorts[0]) {
      partner = this.partner;
    }

    // TODO: Excute search

    if (value !== null || value !== undefined || value !== '') {
      this.getListCampaign();
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.title = null;
      this.source = null;
    }
    if (key === this.keyForSorts[1]) {
      this.partner = null;
      this.source = null;
    }
    if (key === this.keyForSorts[2]) {
      this.partner = null;
      this.title = null;
    }
  }

  onChangePage(event: number) {
    this.campaignSelected = new Campaign();
    this.currentPage = event;
    this.firstIdOfPage = this.currentPage * this.itemsPerPage;
    this.search(this.keySort);
  }

  selectedCampaign(campaign: Campaign) {
    this.enableEditButton = true;
    this.campaignSelected = campaign;
  }

  addCampaign() {
    this.bsModalService.show(CampaignEditComponent, {
      initialState: {
        campaign: null,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  editCampaign(campaign: Campaign) {
    this.bsModalService.show(CampaignEditComponent, {
      initialState: {
        campaign,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
  deleteCampaign(campaign: Campaign) {
    this.bsModalService.show(DialogConfirmComponent, {
      initialState: {
        title: this.getValueFromKeyTranslate('body.function.campaign.control.delete.title'),
        message: this.getValueFromKeyTranslate('body.function.campaign.control.delete.message'),
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
    this.bsModalService.onHidden.subscribe((reason) => {
      if (reason === 'YES') {
        this.campaignService.deleteCampaign(campaign.id).subscribe((resp) => {
          this.showToarst(resp, 'delete', 'body.function.campaign.translate');
        });
      }
    });
  }
  createLinkCampaign(campaign: Campaign) {
    this.bsModalService.show(CampaignManagerLinkComponent, {
      initialState: {
        campaign,
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      animated: true,
    });
  }
}
