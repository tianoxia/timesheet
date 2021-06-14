import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyDraftComponent } from './add-my-draft.component';

describe('AddMyDraftComponent', () => {
  let component: AddMyDraftComponent;
  let fixture: ComponentFixture<AddMyDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
