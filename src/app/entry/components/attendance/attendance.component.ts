import { Component, OnInit } from '@angular/core';

import { CountType } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
    CountType = CountType;

    constructor(
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
    }

    getMemberNameRows(): number {
        if (!this.parent.moneyForm.membershipNames) {
            return 2;
        }
        else {
            const match = this.parent.moneyForm.membershipNames.match(/\r|\n/g);
            return match ? match.length + 1 : 2;
        }
    }

    saveMoneyForm(): void {
        this.service.updateForm(this.parent.moneyForm);
    }
}
