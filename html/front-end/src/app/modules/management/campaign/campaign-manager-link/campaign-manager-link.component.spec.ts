import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManagerLinkComponent } from './campaign-manager-link.component';

describe('CampaignManagerLinkComponent', () => {
  let component: CampaignManagerLinkComponent;
  let fixture: ComponentFixture<CampaignManagerLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignManagerLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignManagerLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
