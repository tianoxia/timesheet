import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyExpenseComponent } from './view-my-expense.component';

describe('ViewMyExpenseComponent', () => {
  let component: ViewMyExpenseComponent;
  let fixture: ComponentFixture<ViewMyExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
