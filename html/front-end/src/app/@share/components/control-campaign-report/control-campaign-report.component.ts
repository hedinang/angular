import { Component, OnInit, Injector, Output, EventEmitter, Input } from '@angular/core';
import { AbstractBaseComponent } from '../../../@core/base/base.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CampaignReportForm } from '../../../@core/models/campaign.model';

@Component({
  selector: 'app-control-campaign-report',
  templateUrl: './control-campaign-report.component.html',
  styleUrls: ['./control-campaign-report.component.scss'],
})
export class ControlCampaignReportComponent extends AbstractBaseComponent implements OnInit {
  @Input() campaignReportForm: CampaignReportForm;
  @Input() isShow: boolean;
  @Output() action: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  intervals = [];

  constructor(injector: Injector) {
    super(injector);
    this.initIntervals();
    this.initForm();
    if (this.isShow === null || this.isShow === undefined) {
      this.isShow = true;
    }
  }

  ngOnInit(): void {
    if (this.campaignReportForm !== null && this.campaignReportForm !== null) {
      this.form.patchValue({
        startDate: this.campaignReportForm.timeFrom,
        endDate: this.campaignReportForm.timeTo,
        interval: this.campaignReportForm.interval,
      });
    } else {
      this.form.patchValue({
        startDate: null,
        endDate: null,
        interval: null,
      });
    }
  }

  initIntervals() {
    this.intervals.push({ key: '1d', value: this.getValueFromKeyTranslate('body.home.campaign-report.request.byDay') });
    this.intervals.push({ key: '1M', value: this.getValueFromKeyTranslate('body.home.campaign-report.request.byMonth') });
  }

  initForm() {
    this.form = this.createForms({
      startDate: new FormControl(null, Validators.compose([Validators.required])),
      endDate: new FormControl(null, Validators.compose([Validators.required])),
      interval: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  get StartDate() {
    return this.form.get('startDate');
  }

  get EndDate() {
    return this.form.get('endDate');
  }

  get Interval() {
    return this.form.get('interval');
  }

  getData() {
    this.campaignReportForm.timeFrom = this.StartDate.value;
    this.campaignReportForm.timeTo = this.EndDate.value;
    this.campaignReportForm.interval = this.Interval.value;
  }
  onSubmit(event: any) {
    this.getData();
    this.action.emit(event);
  }
}
