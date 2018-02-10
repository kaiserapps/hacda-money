import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-free-entries',
    templateUrl: './free-entries.component.html',
    styleUrls: ['./free-entries.component.scss']
})
export class FreeEntriesComponent implements OnInit {
    freeEntryForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        let data = this.parent.moneyForm;
        this.freeEntryForm = this.fb.group({
            danceManager: [data && !!data.danceManager],
            danceManagerName: [data && data.danceManagerName ? data.danceManagerName : ''],
            soundManager: [data && !!data.soundManager],
            soundManagerName: [data && data.soundManagerName ? data.soundManagerName : ''],
            hospitalityHost: [data && !!data.hospitalityHost],
            hospitalityHostName: [data && data.hospitalityHostName ? data.hospitalityHostName : '']
        });

        this.parent.formReady.subscribe(() => {
            data = this.parent.moneyForm;
            this.freeEntryForm.setValue({
                danceManager: !!data.danceManager,
                danceManagerName: data.danceManagerName ? data.danceManagerName : '',
                soundManager: !!data.soundManager,
                soundManagerName: data.soundManagerName ? data.soundManagerName : '',
                hospitalityHost: !!data.hospitalityHost,
                hospitalityHostName: data.hospitalityHostName ? data.hospitalityHostName : '',
            });
        });
    }

    update() {
        this.parent.moneyForm.danceManager = this.freeEntryForm.get('danceManager').value;
        this.parent.moneyForm.danceManagerName = this.parent.moneyForm.danceManager ? this.freeEntryForm.get('danceManagerName').value : '';
        this.parent.moneyForm.soundManager = this.freeEntryForm.get('soundManager').value;
        this.parent.moneyForm.soundManagerName = this.parent.moneyForm.soundManager ? this.freeEntryForm.get('soundManagerName').value : '';
        this.parent.moneyForm.hospitalityHost = this.freeEntryForm.get('hospitalityHost').value;
        this.parent.moneyForm.hospitalityHostName = this.parent.moneyForm.hospitalityHost ? this.freeEntryForm.get('hospitalityHostName').value : '';
        this.service.updateForm(this.parent.moneyForm);
    }
}
