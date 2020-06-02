import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCampaignReportComponent } from './control-campaign-report.component';

describe('ControlCampaignReportComponent', () => {
  let component: ControlCampaignReportComponent;
  let fixture: ComponentFixture<ControlCampaignReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlCampaignReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlCampaignReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
