import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignReportComponent } from './campaign-report.component';


const routes: Routes = [{path: '', component: CampaignReportComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignReportRoutingModule { }
