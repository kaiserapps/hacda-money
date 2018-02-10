import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateModel } from '../../../framework/models/date.model';
import { CheckModel, CheckReason } from '../../models/check.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-checks-received',
    templateUrl: './checks-received.component.html',
    styleUrls: ['./checks-received.component.scss']
})
export class ChecksReceivedComponent implements OnInit {
    private _checkReasons: {
        value: number,
        text: string
    }[];

    checkForm: FormArray;

    get checkReasons() {
        if (!this._checkReasons) {
            this._checkReasons = [];
            for (const cr in CheckReason) {
                if (CheckReason.hasOwnProperty(cr)) {
                    const isValueProperty = parseInt(cr, 10) >= 0;
                    if (isValueProperty) {
                        this._checkReasons.push({
                            value: +cr,
                            text: CheckReason[cr]
                        });
                    }
                }
            }
        }

        return this._checkReasons;
    }

    constructor(
        private fb: FormBuilder,
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.loadForm();
        this.parent.formReady.subscribe(() => {
            this.loadForm();
        });
    }

    loadForm(): void {
        if (this.parent.moneyForm) {
            this.checkForm = this.fb.array(this.parent.moneyForm.checks.map(x => this.toCheckFormRow(x)));
        }
    }

    toCheckFormRow(chk: CheckModel): FormGroup {
        return this.fb.group({
            checkNumber: [chk.checkNumber, Validators.required],
            payer: [chk.payer, Validators.required],
            reason: [chk.reason, Validators.required],
            amount: [chk.amount, Validators.required],
            dated: [chk.dated ? chk.dated.toHTMLdate() : '', Validators.required]
        });
    }

    update(): void {
        if (this.checkForm.valid) {
            const checks = this.checkForm.controls.map(x => {
                return {
                    checkNumber: x.get('checkNumber').value,
                    payer: x.get('payer').value,
                    reason: x.get('reason').value,
                    amount: x.get('amount').value,
                    dated: new DateModel(x.get('dated').value)
                };
            }).filter(x => x.amount || x.checkNumber || x.dated || x.payer || x.reason);

            this.parent.moneyForm.checks = checks;
            this.service.updateForm(this.parent.moneyForm);
        }
    }

    addCheck(): void {
        this.checkForm.push(this.toCheckFormRow(new CheckModel));
    }
}
