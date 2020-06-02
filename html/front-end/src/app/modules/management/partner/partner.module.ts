import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { ShareModule } from '../../../@share/share.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';

@NgModule({
  declarations: [PartnerComponent, PartnerListComponent, PartnerEditComponent],
  imports: [CommonModule, PartnerRoutingModule, ShareModule],
})
export class PartnerModule {}
