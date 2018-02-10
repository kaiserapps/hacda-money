import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormModel } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';

@Component({
    selector: 'app-form-overview',
    templateUrl: './form-overview.component.html',
    styleUrls: ['./form-overview.component.scss']
})
export class FormOverviewComponent implements OnInit {
    id: string;
    moneyForm: FormModel;
    formReady = new EventEmitter();
    technoChanged = new EventEmitter<boolean>();

    constructor(
        private route: ActivatedRoute,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.service.getForm(this.id).then(form => {
            this.moneyForm = form.copyTo(this.moneyForm);
            this.formReady.emit();
        });
    }
}
