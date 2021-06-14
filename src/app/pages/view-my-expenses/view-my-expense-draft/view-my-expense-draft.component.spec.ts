import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyExpenseDraftComponent } from './view-my-expense-draft.component';

describe('ViewMyExpenseDraftComponent', () => {
  let component: ViewMyExpenseDraftComponent;
  let fixture: ComponentFixture<ViewMyExpenseDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyExpenseDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyExpenseDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
