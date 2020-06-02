import { Injectable, Injector } from '@angular/core';
import { BaseService } from './base.service';
import { DataSearchRequest, DataSearchResponse } from '../models/data-search.model';
import { Observable } from 'rxjs';
import { Campaign, CampaignReport, CampaignReportRequest } from '../models/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService extends BaseService {
  constructor(injetor: Injector) {
    super(injetor);
  }
  getCampaignByPage(dataSearchRequest: DataSearchRequest): Observable<DataSearchResponse> {
    this.requestOptions.data = dataSearchRequest;
    return this.httpService.post('campaigns/page', this.requestOptions);
  }
  createCampaign(campaign: Campaign): Observable<Campaign> {
    this.requestOptions.data = campaign;
    return this.httpService.post('campaigns/', this.requestOptions);
  }
  updateCampaign(campaign: Campaign): Observable<Campaign> {
    this.requestOptions.data = campaign;
    return this.httpService.put('campaigns/' + campaign.id, this.requestOptions);
  }
  deleteCampaign(id: number): Observable<boolean> {
    this.resetRequest();
    return this.httpService.delete('campaigns/' + id, this.requestOptions);
  }

  reportCampaign(campaignReportRequest?: CampaignReportRequest): Observable<CampaignReport[]> {
    if (campaignReportRequest === undefined || campaignReportRequest === null) {
      this.resetRequest();
    } else {
      this.requestOptions.data = campaignReportRequest;
    }
    return this.httpService.post('campaigns/report', this.requestOptions);
  }

  reportCampaignDetail(campaignReportRequest: CampaignReportRequest, code: string): Observable<CampaignReport> {
    if (campaignReportRequest === undefined || campaignReportRequest === null) {
      this.resetRequest();
    } else {
      this.requestOptions.data = campaignReportRequest;
    }
    return this.httpService.post('campaigns/' + code + '/details', this.requestOptions);
  }
}
