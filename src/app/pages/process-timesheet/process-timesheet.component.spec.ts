import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTimesheetComponent } from './process-timesheet.component';

describe('ProcessTimesheetComponent', () => {
  let component: ProcessTimesheetComponent;
  let fixture: ComponentFixture<ProcessTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
