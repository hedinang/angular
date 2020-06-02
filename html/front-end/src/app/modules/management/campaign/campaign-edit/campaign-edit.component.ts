import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { BsModalRef } from 'ngx-bootstrap';
import { PartnerService } from '../../../../@core/services/partner.service';
import { Campaign } from '../../../../@core/models/campaign.model';
import { Partners } from '../../../../@core/models/partners.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async } from '@angular/core/testing';
import { CampaignService } from 'src/app/@core/services/campaign.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss'],
})
export class CampaignEditComponent extends AbstractBaseComponent implements OnInit {
  constructor(
    injector: Injector,
    protected readonly bsModalRef: BsModalRef,
    protected readonly partnerService: PartnerService,
    protected readonly campaignService: CampaignService,
  ) {
    super(injector);
    this.initForm();
  }

  campaign: Campaign;
  listPartner: Partners[];
  form: FormGroup;

  initForm() {
    this.form = this.createForms({
      partner: new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      source: new FormControl(null, Validators.compose([Validators.required])),
      type: new FormControl(null, Validators.compose([])),
      isPostBack: new FormControl(null, Validators.compose([Validators.required]))
    });
  }

  async ngOnInit() {
    await this.getListPartner();
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

  initDataForm() {
    if (this.campaign !== null && this.campaign !== undefined) {
      this.form.patchValue({
        partner: this.getPartNerFromCampaign(this.campaign),
        title: this.campaign.title,
        source: this.campaign.source,
        type: this.campaign.type ? this.campaign.type : this.getValueFromKeyTranslate('body.function.campaign.type.not-found'),
        isPostBack: this.campaign.isPostBack === true ? true : false
      });
    } else {
      this.resetDataForm();
    }
  }

  resetDataForm() {
    this.form.patchValue({
      partner: null,
      title: null,
      source: null,
      type: null,
      isPostBack: false
    });
  }
  getPartNerFromCampaign(campaign: Campaign): Partners {
    let partner = new Partners();
    if (Array.isArray(this.listPartner) && this.listPartner.length > 0) {
      this.listPartner.forEach((item) => {
        if (item.id === campaign.partnerId) {
          partner = item;
        }
      });
    }
    return partner;
  }
  get Partner() {
    return this.form.get('partner');
  }

  get Title() {
    return this.form.get('title');
  }
  get Source() {
    return this.form.get('source');
  }
  get Type() {
    return this.form.get('type');
  }
  get IsPostBack() {
    return this.form.get('isPostBack');
  }
  getData() {
    if (this.campaign === null || this.campaign === undefined) {
      this.campaign = new Campaign();
    }
    this.campaign.partnerId = this.Partner.value.id;
    this.campaign.partnerName = this.Partner.value.name;
    this.campaign.title = this.Title.value;
    this.campaign.source = this.Source.value;
    this.campaign.type = this.Type.value === this.getValueFromKeyTranslate('body.function.campaign.type.not-found')
      ? null : this.Type.value;
    this.campaign.isPostBack = this.IsPostBack.value;
  }

  onSubmit() {
    this.getData();
    if (this.campaign.id !== null && this.campaign.id !== undefined) {
      this.campaignService.updateCampaign(this.campaign).subscribe((res) => {
        this.showToarst(res, 'edit', 'body.function.campaign.translate');
        this.onClose('YES');
      });
    } else {
      this.campaignService.createCampaign(this.campaign).subscribe((res) => {
        this.showToarst(res, 'add', 'body.function.campaign.translate');
        this.onClose('YES');
      });
    }
  }

  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
