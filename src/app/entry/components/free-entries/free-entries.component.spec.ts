import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeEntriesComponent } from './free-entries.component';

describe('FreeEntriesComponent', () => {
  let component: FreeEntriesComponent;
  let fixture: ComponentFixture<FreeEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
