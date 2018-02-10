import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormModel } from '../../models/form.model';

@Component({
    selector: 'app-balance-count',
    templateUrl: './balance-count.component.html',
    styleUrls: ['./balance-count.component.scss']
})
export class BalanceCountComponent implements OnInit {
    @Input() moneyForm: FormModel;
    @Input() countType: string;
    @Input() displayName: string;
    @Input() price: number;
    @Input() hideIfTechno: boolean;
    @Input() hideIfNotTechno: boolean;
    @Input() readOnly: boolean;
    @Input() useLink: boolean;

    @Output() countChanged = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

}
