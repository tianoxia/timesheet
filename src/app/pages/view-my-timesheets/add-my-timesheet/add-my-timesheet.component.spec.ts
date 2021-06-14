import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyTimesheetComponent } from './add-my-timesheet.component';

describe('AddMyTimesheetComponent', () => {
  let component: AddMyTimesheetComponent;
  let fixture: ComponentFixture<AddMyTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
