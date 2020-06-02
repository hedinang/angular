import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { ShareModule } from '../../../@share/share.module';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { CampaignManagerLinkComponent } from './campaign-manager-link/campaign-manager-link.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [CampaignComponent, CampaignListComponent, CampaignEditComponent, CampaignManagerLinkComponent],
  imports: [CommonModule, CampaignRoutingModule, ShareModule, ClipboardModule],
})
export class CampaignModule {}
