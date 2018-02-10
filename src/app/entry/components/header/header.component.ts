import { CountType } from '../../models/form.model';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    headerForm: FormGroup;

    get startingCash(): FormControl {
        return this.headerForm.get('startingCash') as FormControl;
    }

    get location(): FormControl {
        return this.headerForm.get('location') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.headerForm = this.fb.group({
            startingCash: [this.parent.moneyForm ? +this.parent.moneyForm.startingCash : 0, Validators.required],
            location: [this.parent.moneyForm ? this.parent.moneyForm.location : '', Validators.required]
        });

        this.parent.formReady.subscribe(() => {
            this.startingCash.setValue(+this.parent.moneyForm.startingCash);
            this.location.setValue(this.parent.moneyForm.location);
        });
    }

    update() {
        if (this.headerForm.valid) {
            this.parent.moneyForm.startingCash = +this.startingCash.value;
            this.parent.moneyForm.location = this.location.value;
            this.service.updateForm(this.parent.moneyForm);
        }
        else {
            for (const c in this.headerForm.controls) {
                if (this.headerForm.controls.hasOwnProperty(c)) {
                    this.headerForm.controls[c].markAsDirty();
                }
            }
        }
    }

    toggleTechno() {
        this.parent.moneyForm.isTechno = !this.parent.moneyForm.isTechno;
        this.parent.technoChanged.emit(this.parent.moneyForm.isTechno);
        if (this.parent.moneyForm.isTechno) {
            this.parent.moneyForm.counts[CountType.Member] = 0;
            this.parent.moneyForm.counts[CountType.Nonmember] = 0;
            this.parent.moneyForm.counts[CountType.Student] = 0;
            this.parent.moneyForm.counts[CountType.CouponIn] = 0;
        }
        else {
            this.parent.moneyForm.counts[CountType.Techno] = 0;
        }

        this.service.updateForm(this.parent.moneyForm);
    }
}
