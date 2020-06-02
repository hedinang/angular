import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupAccountComponent } from './group-account.component';

const routes: Routes = [{ path: '', component: GroupAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupAccountRoutingModule {}
