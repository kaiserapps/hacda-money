import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CountType, FormModel } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
    CountType = CountType;
    balanceForm: FormGroup;

    get moneyForm(): FormModel {
        return this.parent.moneyForm;
    }

    get counts(): { [key: string]: number } {
        return this.moneyForm ? this.moneyForm.counts : {};
    }

    get donations(): FormControl {
        return this.balanceForm.get('donations') as FormControl;
    }

    get endingCash(): FormControl {
        return this.balanceForm.get('endingCash') as FormControl;
    }

    get bandSound(): FormControl {
        return this.balanceForm.get('bandSound') as FormControl;
    }

    get amountAdded(): FormControl {
        return this.balanceForm.get('amountAdded') as FormControl;
    }

    get cashAddedBy(): FormControl {
        return this.balanceForm.get('cashAddedBy') as FormControl;
    }

    get cashBoxHeldBy(): FormControl {
        return this.balanceForm.get('cashBoxHeldBy') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.balanceForm = this.fb.group({
            donations: this.moneyForm ? this.moneyForm.donations : 0,
            endingCash: [this.moneyForm ? this.moneyForm.endingCash : 0, Validators.required],
            bandSound: this.moneyForm ? !!this.moneyForm.bandSound : false,
            amountAdded: this.moneyForm ? this.moneyForm.amountAdded : 0,
            cashAddedBy: this.moneyForm ? this.moneyForm.cashAddedBy || '' : '',
            cashBoxHeldBy: [this.moneyForm ? this.moneyForm.cashBoxHeldBy || '' : '', Validators.required]
        });

        this.parent.formReady.subscribe(() => {
            this.balanceForm.setValue({
                donations: this.moneyForm.donations,
                endingCash: this.moneyForm.endingCash,
                bandSound: !!this.moneyForm.bandSound,
                amountAdded: this.moneyForm.amountAdded || 0,
                cashAddedBy: this.moneyForm.cashAddedBy || '',
                cashBoxHeldBy: this.moneyForm.cashBoxHeldBy || ''
            });
        });
    }

    update() {
        this.parent.moneyForm.donations = +this.donations.value;
        this.parent.moneyForm.endingCash = +this.endingCash.value;
        this.parent.moneyForm.bandSound = !!this.bandSound.value;
        this.parent.moneyForm.amountAdded = +this.amountAdded.value;
        this.parent.moneyForm.cashAddedBy = this.cashAddedBy.value;
        this.parent.moneyForm.cashBoxHeldBy = this.cashBoxHeldBy.value;
        this.service.updateForm(this.moneyForm);
    }
}
