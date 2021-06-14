import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTimesheetsComponent } from './view-my-timesheets.component';

describe('ViewMyTimesheetsComponent', () => {
  let component: ViewMyTimesheetsComponent;
  let fixture: ComponentFixture<ViewMyTimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyTimesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
