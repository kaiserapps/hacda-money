import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecksReceivedComponent } from './checks-received.component';

describe('ChecksReceivedComponent', () => {
  let component: ChecksReceivedComponent;
  let fixture: ComponentFixture<ChecksReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecksReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecksReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
