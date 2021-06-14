import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessExpenseComponent } from './process-expense.component';

describe('ViewMyExpenseComponent', () => {
  let component: ProcessExpenseComponent;
  let fixture: ComponentFixture<ProcessExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
