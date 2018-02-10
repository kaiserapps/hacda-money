import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionErrorComponent } from './submission-error.component';

describe('SubmissionErrorComponent', () => {
  let component: SubmissionErrorComponent;
  let fixture: ComponentFixture<SubmissionErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
