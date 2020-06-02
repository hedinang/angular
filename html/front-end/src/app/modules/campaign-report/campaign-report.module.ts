import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignReportRoutingModule } from './campaign-report-routing.module';
import { CampaignReportComponent } from './campaign-report.component';
import { ShareModule } from '../../@share/share.module';
import { CampaignReportListComponent } from './campaign-report-list/campaign-report-list.component';
import { HighchartsChartModule } from 'highcharts-angular';
@NgModule({
  declarations: [CampaignReportComponent, CampaignReportListComponent],
  imports: [
    CommonModule,
    ShareModule,
    CampaignReportRoutingModule,
    HighchartsChartModule
  ]
})
export class CampaignReportModule { }
