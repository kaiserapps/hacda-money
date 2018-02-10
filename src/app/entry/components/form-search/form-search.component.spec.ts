import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFormService } from '../services/abstract-form.service';
import { MockFormService } from '../services/mock-form.service';
import { FormSearchComponent } from './form-search.component';

describe('FormSearchComponent', () => {
    let component: FormSearchComponent;
    let fixture: ComponentFixture<FormSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormSearchComponent ],
            providers: [
                { provide: AbstractFormService, useClass: MockFormService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
