import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyExpensesComponent } from './view-my-expenses.component';

describe('ViewMyExpensesComponent', () => {
  let component: ViewMyExpensesComponent;
  let fixture: ComponentFixture<ViewMyExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
