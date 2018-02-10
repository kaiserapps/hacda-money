import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { CountType, FormModel } from '../../models/form.model';

@Component({
    selector: 'app-attendance-counter',
    templateUrl: './attendance-counter.component.html',
    styleUrls: ['./attendance-counter.component.scss']
})
export class AttendanceCounterComponent implements OnInit {
    private _abbrev: string;
    editMode: boolean;

    @Input() moneyForm: FormModel;
    @Input() countType: CountType;
    @Input() displayName: string;
    @Input() set abbreviation(abbrev: string) {
        this._abbrev = abbrev;
    }
    @Input() price: string;

    @Output() countChange = new EventEmitter();

    get abbreviation(): string {
        return this._abbrev ? this._abbrev : this.displayName;
    }

    @ViewChild('editedNumber') editInput: ElementRef;

    constructor() { }

    ngOnInit() {
        this.moneyForm.counts[this.countType] = this.moneyForm.counts[this.countType] || 0;
    }

    incrementCount() {
        this.moneyForm.incrementCount(this.countType);
        this.countChange.emit();
    }

    editCount() {
        this.editMode = true;
        setTimeout(() => this.editInput.nativeElement.focus(), 0);
    }

    changeCount() {
        this.editMode = false;
        this.moneyForm.changeCount(this.countType, this.editInput.nativeElement.value);
        this.countChange.emit();
    }

}
