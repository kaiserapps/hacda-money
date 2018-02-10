import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormModel, PerformerType } from '../../models/form.model';

@Component({
    selector: 'app-performer',
    templateUrl: './performer.component.html',
    styleUrls: ['./performer.component.scss']
})
export class PerformerComponent implements OnInit {
    performerForm: FormGroup;
    @Input() moneyForm: FormModel;
    @Input() displayName: string;
    @Input() payment: string;
    @Input() type: PerformerType;

    @Output() performerChange = new EventEmitter();

    get performerName(): FormControl {
        return this.performerForm.get('performerName') as FormControl;
    }

    get finalPayment(): FormControl {
        return this.performerForm.get('finalPayment') as FormControl;
    }

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.performerForm = this.fb.group({
            performerName: [this.moneyForm.performers[this.type] ? this.moneyForm.performers[this.type] : '', Validators.required],
            finalPayment: [this.moneyForm.performerPayments[this.type] ? this.moneyForm.performerPayments[this.type] : +this.payment, Validators.required]
        });
    }

    resetPayment() {
        this.performerForm.get('finalPayment').setValue(+this.payment);
        this.moneyForm.performerPayments[this.type] = +this.payment;
    }

    update() {
        if (this.performerForm.valid) {
            this.moneyForm.performers[this.type] = this.performerForm.get('performerName').value;
            this.moneyForm.performerPayments[this.type] = this.performerForm.get('finalPayment').value;
            this.performerChange.emit();
        }
        else {
            for (const c in this.performerForm.controls) {
                if (this.performerForm.controls.hasOwnProperty(c)) {
                    this.performerForm.controls[c].markAsDirty();
                }
            }
        }
    }
}
