import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCounterComponent } from './attendance-counter.component';

describe('AttendanceCounterComponent', () => {
  let component: AttendanceCounterComponent;
  let fixture: ComponentFixture<AttendanceCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
