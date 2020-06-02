import { Component, OnInit, Injector } from '@angular/core';
import { AbstractBaseComponent } from '../../@core/base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.scss'],
})
export class CampaignReportComponent extends AbstractBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
