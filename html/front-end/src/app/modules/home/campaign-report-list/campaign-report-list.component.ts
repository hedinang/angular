import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';
import { CampaignReport, CampaignReportRequest, CampaignReportForm } from '../../../@core/models/campaign.model';
import { Partners } from '../../../@core/models/partners.model';
import { PartnerService } from '../../../@core/services/partner.service';
import { CampaignService } from '../../../@core/services/campaign.service';
import { Income } from '../../../@core/models/income.model';
import { isRealValue, toUTCTime } from '../../../@core/common/ultis';

@Component({
  selector: 'app-campaign-report-list',
  templateUrl: './campaign-report-list.component.html',
  styleUrls: ['./campaign-report-list.component.scss'],
})
export class CampaignReportListComponent extends AbstractBaseComponent implements OnInit {
  partner: string;
  title: string;
  // source: string;

  isShowControl = true;
  campaignReportForm: CampaignReportForm = new CampaignReportForm();

  campaignReportSelected: CampaignReport = new CampaignReport();
  listCampaignReport: CampaignReport[];
  listPartners: Partners[];

  keyForSorts = ['partner', 'title', 'source'];

  constructor(injector: Injector, private readonly partnerService: PartnerService, private readonly campaignService: CampaignService) {
    super(injector);
    this.resetFormControl();
  }

  async ngOnInit() {
    await this.getListParter();
    this.reloadList();
  }

  resetFormControl() {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    this.campaignReportForm.timeFrom = startDate;
    this.campaignReportForm.timeTo = endDate;
    this.campaignReportForm.interval = '1d';
    this.onSubmit();
  }

  async getListParter() {
    const resp = await this.partnerService.getAllPartner().toPromise();
    this.loadingService.hide();
    if (resp !== null && resp !== undefined) {
      this.listPartners = resp;
    }
  }

  resetInputSearch(key: string) {
    if (key === this.keyForSorts[0]) {
      this.title = null;
      // this.source = null;
    }
    if (key === this.keyForSorts[1]) {
      this.partner = null;
      // this.source = null;
    }
    if (key === this.keyForSorts[2]) {
      this.partner = null;
      this.title = null;
    }
  }

  search(key: string) {
    let value: string | number = null;
    if (key === this.keyForSorts[1]) {
      value = this.initValueAndKeySort(this.keyForSorts[0], this.title);
    }

    // if (key === this.keyForSorts[2]) {
    //   value = this.initValueAndKeySort(this.keyForSorts[1], this.source);
    // }
    // TODO: Search
    if (value !== null || value !== undefined || (typeof value === 'string' && value.trim() !== null)) {
      if (isRealValue(this.campaignReportForm.timeFrom) || isRealValue(this.campaignReportForm.timeTo)) {
        this.resetFormControl();
      } else {
        this.onSubmit();
      }
    }
  }

  getListCampaign(campaignReportRequest?: CampaignReportRequest) {
    this.loadingService.show();
    this.campaignService.reportCampaign(campaignReportRequest).subscribe((res) => {
      this.loadingService.hide();
      this.listCampaignReport = res;
    });
  }

  onSubmit() {
    const startDate = this.campaignReportForm.timeFrom;
    startDate.setHours(0, 0, 0, 0);

    const endDate = this.campaignReportForm.timeTo;
    endDate.setHours(23, 59, 59, 999);

    const campaignReportRequest = new CampaignReportRequest();

    campaignReportRequest.timeFrom = toUTCTime(startDate).getTime();
    campaignReportRequest.timeTo = toUTCTime(endDate).getTime();
    campaignReportRequest.interval = this.campaignReportForm.interval;
    this.getListCampaign(campaignReportRequest);
  }

  selectCampaignReport(campaignReport: CampaignReport) {
    this.campaignReportSelected = campaignReport;
  }

  getDataIncome(income: Income, key: number | string): number {
    let result = 0;
    if (Array.isArray(income.type.buckets) && income.type.buckets.length > 0) {
      income.type.buckets.forEach((element) => {
        if (element.key === key) {
          result = element.doc_count;
        }
      });
    }
    return result;
  }

  viewDetail(campaignReport: CampaignReport) {
    this.navigate(['/campaign', campaignReport.code]).catch((error) => {
      console.log(error);
    });
  }
}
