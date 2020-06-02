import { Tracking } from './tracking.model';
import { Income } from './income.model';
export class Campaign {
  id: number;
  partnerId: number;
  partnerName?: string;
  code: string;
  title: string;
  source: string;
  type: number;
  isPostBack: boolean | null;
  timeUpdated: Date;
}

export class CampaignReport {
  id: number;
  partnerId: number;
  partnerName?: string;
  code: string;
  title: string;
  source: string;
  tracking: Tracking;
  income: Income;
}

export class CampaignReportRequest {
  timeFrom: number;
  timeTo: number;
  interval: string;
}

export class CampaignReportForm {
  timeFrom: Date;
  timeTo: Date;
  interval: string;
}
