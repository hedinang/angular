import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccountListComponent } from './group-account-list.component';

describe('GroupAccountListComponent', () => {
  let component: GroupAccountListComponent;
  let fixture: ComponentFixture<GroupAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
