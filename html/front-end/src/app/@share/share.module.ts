import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ControlGroupComponent } from './components/control-group/control-group.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BoxHeaderComponent } from './components/box-header/box-header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { SwitchControlComponent } from './components/switch-control/switch-control.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ControlCampaignReportComponent } from './components/control-campaign-report/control-campaign-report.component';
import { TreeviewModule } from 'ngx-treeview';
import { HighchartsChartModule } from 'highcharts-angular';
const BASE_MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  BsDropdownModule.forRoot(),
  CollapseModule.forRoot(),
  NgSelectModule,
  ToastrModule.forRoot(),
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  NgxPaginationModule,
  UiSwitchModule,
  HighchartsChartModule,
  TreeviewModule.forRoot()
];
const PIPES = [];
const COMPONENTS = [];
const ENTRY_COMPONENTS = [
  ControlGroupComponent,
  BoxHeaderComponent,
  DialogConfirmComponent,
  SwitchControlComponent,
  ControlCampaignReportComponent,
];
const DIRECTIVES = [];
@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, ...PIPES, ...COMPONENTS, ...ENTRY_COMPONENTS, ...DIRECTIVES],
  declarations: [...PIPES, ...ENTRY_COMPONENTS, ...COMPONENTS, ...DIRECTIVES],
  entryComponents: [...ENTRY_COMPONENTS],
})
export class ShareModule { }
