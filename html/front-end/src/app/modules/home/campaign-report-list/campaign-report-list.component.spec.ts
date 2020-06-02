import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignReportListComponent } from './campaign-report-list.component';

describe('CampaignReportListComponent', () => {
  let component: CampaignReportListComponent;
  let fixture: ComponentFixture<CampaignReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
