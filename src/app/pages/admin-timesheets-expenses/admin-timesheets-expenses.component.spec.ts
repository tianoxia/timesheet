import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimesheetsExpensesComponent } from './admin-timesheets-expenses.component';

describe('AdminTimesheetsExpensesComponent', () => {
  let component: AdminTimesheetsExpensesComponent;
  let fixture: ComponentFixture<AdminTimesheetsExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTimesheetsExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimesheetsExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
