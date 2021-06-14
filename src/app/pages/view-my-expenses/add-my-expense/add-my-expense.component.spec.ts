import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyExpenseComponent } from './add-my-expense.component';

describe('AddMyExpenseComponent', () => {
  let component: AddMyExpenseComponent;
  let fixture: ComponentFixture<AddMyExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
