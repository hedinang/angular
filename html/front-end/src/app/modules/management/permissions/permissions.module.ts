import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { ShareModule } from '../../../@share/share.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { PermissionsEditComponent } from './permissions-edit/permissions-edit.component';

@NgModule({
  declarations: [PermissionsComponent, PermissionsListComponent, PermissionsEditComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    ShareModule,
    TranslateModule,
    ModalModule
  ]
})
export class PermissionsModule { }
