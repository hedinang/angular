import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupAccountRoutingModule } from './group-account-routing.module';
import { GroupAccountComponent } from './group-account.component';
import { GroupAccountListComponent } from './group-account-list/group-account-list.component';
import { GroupAccountEditComponent } from './group-account-edit/group-account-edit.component';
import { GroupAccountPermistionComponent } from './group-account-permistion/group-account-permistion.component';
import { ShareModule } from '../../../@share/share.module';
import { TreeviewModule } from 'ngx-treeview';
@NgModule({
  declarations: [GroupAccountComponent, GroupAccountListComponent, GroupAccountEditComponent, GroupAccountPermistionComponent],
  imports: [CommonModule, GroupAccountRoutingModule, ShareModule, TreeviewModule.forRoot()],
})
export class GroupAccountModule {}
