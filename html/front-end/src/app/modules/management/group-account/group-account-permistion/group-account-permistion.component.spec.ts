import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccountPermistionComponent } from './group-account-permistion.component';

describe('GroupAccountPermistionComponent', () => {
  let component: GroupAccountPermistionComponent;
  let fixture: ComponentFixture<GroupAccountPermistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAccountPermistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccountPermistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
