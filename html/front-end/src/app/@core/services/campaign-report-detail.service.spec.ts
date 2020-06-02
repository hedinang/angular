import { TestBed } from '@angular/core/testing';

import { CampaignReportDetailService } from './campaign-report-detail.service';

describe('CampaignReportDetailService', () => {
  let service: CampaignReportDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignReportDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
