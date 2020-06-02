import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ShareModule } from '../../../@share/share.module';
import { AccountListComponent } from './account-list/account-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { AccountEditComponent } from './account-edit/account-edit.component';

@NgModule({
  declarations: [AccountComponent, AccountListComponent, AccountEditComponent],
  imports: [CommonModule, AccountRoutingModule, ShareModule],
})
export class AccountModule {}
