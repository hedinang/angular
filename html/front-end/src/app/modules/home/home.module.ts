import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ShareModule } from '../../@share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CampaignReportListComponent } from './campaign-report-list/campaign-report-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [HomeComponent, CampaignReportListComponent],
  imports: [
    CommonModule,
    ShareModule,
    HomeRoutingModule,
    TranslateModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
  ],
})
export class HomeModule {}
