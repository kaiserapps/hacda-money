import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCountComponent } from './balance-count.component';

describe('BalanceCountComponent', () => {
  let component: BalanceCountComponent;
  let fixture: ComponentFixture<BalanceCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
