import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceBalanceComponent } from './attendance-balance.component';

describe('AttendanceBalanceComponent', () => {
  let component: AttendanceBalanceComponent;
  let fixture: ComponentFixture<AttendanceBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
