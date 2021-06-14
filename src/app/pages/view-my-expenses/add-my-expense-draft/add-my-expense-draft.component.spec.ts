import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyExpenseDraftComponent } from './add-my-expense-draft.component';

describe('AddMyExpenseDraftComponent', () => {
  let component: AddMyExpenseDraftComponent;
  let fixture: ComponentFixture<AddMyExpenseDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyExpenseDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyExpenseDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
