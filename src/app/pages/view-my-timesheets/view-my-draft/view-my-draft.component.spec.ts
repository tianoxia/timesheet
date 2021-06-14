import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyDraftComponent } from './view-my-draft.component';

describe('ViewMyDraftComponent', () => {
  let component: ViewMyDraftComponent;
  let fixture: ComponentFixture<ViewMyDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
