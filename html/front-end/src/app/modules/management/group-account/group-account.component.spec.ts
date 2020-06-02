import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccountComponent } from './group-account.component';

describe('GroupAccountComponent', () => {
  let component: GroupAccountComponent;
  let fixture: ComponentFixture<GroupAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
