import { Component, OnInit, Injector } from '@angular/core';
import { Campaign } from '../../../../@core/models/campaign.model';
import { AbstractBaseComponent } from '../../../../@core/base/base.component';
import { BsModalRef } from 'ngx-bootstrap';
import { environment } from '../../../../../environments/environment';
import { ClipboardService } from 'ngx-clipboard';
import { toCapitalize } from '../../../../@core/common/ultis';

@Component({
  selector: 'app-campaign-manager-link',
  templateUrl: './campaign-manager-link.component.html',
  styleUrls: ['./campaign-manager-link.component.scss']
})
export class CampaignManagerLinkComponent extends AbstractBaseComponent implements OnInit {
  campaign: Campaign;
  script: string;
  constructor(injector: Injector, protected readonly bsModalRef: BsModalRef, protected readonly clipboardService: ClipboardService) {
    super(injector);
  }

  ngOnInit(): void {
    this.script = '<script> var tag = ' + this.campaign.code + ';' + '</script>'
      + '<script src = \"' + environment.urlFileScript + '\"' + '></script>';
  }
  onSubmit() {
    this.clipboardService.copyFromContent(this.script);
    this.onClose('NO');
    this.toastr.show(this.getValueFromKeyTranslate('body.function.campaign.control.option.notify'),
      toCapitalize(this.getValueFromKeyTranslate('body.toastr.success')));
  }
  onClose(reason: string) {
    this.bsModalService.setDismissReason(reason);
    this.bsModalRef.hide();
  }
}
