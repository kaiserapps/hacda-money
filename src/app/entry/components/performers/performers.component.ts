import { PerformerComponent } from '../performer/performer.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { PerformerType } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-performers',
    templateUrl: './performers.component.html',
    styleUrls: ['./performers.component.scss']
})
export class PerformersComponent implements OnInit {
    PerformerType = PerformerType;

    get bandMemberPayment(): number {
        if (this.parent.moneyForm.bandMemberCount === 1) {
            return 75;
        }
        else if (this.parent.moneyForm.bandMemberCount === 2) {
            return 70;
        }
        else {
            return 65;
        }
    }

    @ViewChildren(PerformerComponent) perfomers: QueryList<PerformerComponent>;

    constructor(
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.parent.technoChanged.subscribe(isTechno => {
            this.parent.moneyForm.bandMemberCount = isTechno ? 1 : 2;
            this.saveMoneyForm();
        });
    }

    updateBandCount(): void {
        this.resetAllPayments();
        this.saveMoneyForm();
    }

    saveMoneyForm(): void {
        this.service.updateForm(this.parent.moneyForm);
    }

    bandMemberProgress(): string {
        return (this.parent.moneyForm.bandMemberCount * 100 / 4) + '%';
    }

    resetAllPayments(): void {
        for (const p of this.perfomers.toArray()) {
            p.resetPayment();
        }
        this.saveMoneyForm();
    }
}
