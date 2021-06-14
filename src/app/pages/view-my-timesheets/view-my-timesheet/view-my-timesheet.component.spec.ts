import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTimesheetComponent } from './view-my-timesheet.component';

describe('ViewMyTimesheetComponent', () => {
  let component: ViewMyTimesheetComponent;
  let fixture: ComponentFixture<ViewMyTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
