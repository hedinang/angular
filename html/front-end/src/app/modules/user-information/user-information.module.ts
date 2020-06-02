import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInformationRoutingModule } from './user-information-routing.module';
import { UserInformationComponent } from './user-information.component';
import { ShareModule } from '../../@share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserInformationComponent],
  imports: [CommonModule, UserInformationRoutingModule, TranslateModule, ShareModule, FormsModule]
})
export class UserInformationModule { }
