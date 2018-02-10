import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DateModel } from '../../../framework/models/date.model';
import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';
import { AbstractDialogProvider } from '../../../framework/providers/abstract-dialog.provider';
import { AbstractStorageProvider } from '../../../framework/providers/abstract-storage.provider';
import { FormModel } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';

@Component({
    selector: 'app-form-search',
    templateUrl: './form-search.component.html',
    styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
    searchForm: FormGroup;
    userId: string;

    get moneyManager(): FormControl {
        return this.searchForm.get('moneyManager') as FormControl;
    }

    get dateOfDance(): FormControl {
        return this.searchForm.get('dateOfDance') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private service: AbstractFormService,
        private dialog: AbstractDialogProvider,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        if (!this.authProvider.loginInfo) {
            this.router.navigate(['auth', 'login']);
        }

        this.userId = this.authProvider.loginInfo.userId;
        this.searchForm = this.fb.group({
            moneyManager: [this.authProvider.loginInfo.username, Validators.required],
            dateOfDance: [new DateModel().toHTMLdate(), Validators.required]
        });
    }

    search() {
        if (this.searchForm.valid) {
            const model = this.searchForm.value as FormModel;
            model.dateOfDance = new DateModel(model.dateOfDance);
            this.service.findForm(model.dateOfDance).then(f => {
                if (f && f.uniqueId) {
                    if (f.userIds.indexOf(this.userId) > -1) {
                        this.router.navigate(['form', 'entry', f.uniqueId]);
                    }
                    else {
                        const useFormText = `A form for ${f.dateOfDance.toDateString()} was already started by ${f.moneyManager}. Would you like to use it (and add your name)?`;
                        this.dialog.confirm(useFormText, 'Form for this date exists').then(answer => {
                            if (answer) {
                                f.addManager(this.userId, model.moneyManager);
                                this.service.updateForm(f).then(() => this.router.navigate(['form', 'entry', f.uniqueId]));
                            }
                            else {
                                const deleteText = `Would you like to delete ${f.moneyManager}'s form and start a new one?`;
                                this.dialog.confirm(deleteText, 'Delete existing form?').then(delAnswer => {
                                    if (delAnswer) {
                                        this.dialog.confirm('This action is unrecoverable! Are you sure you wish to delete the existing form?', 'Are you sure?').then(doDelete => {
                                            if (doDelete) {
                                                this.service.deleteForm(f.uniqueId).then(() => this.createAndNavigateToForm(model));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                else {
                    this.createAndNavigateToForm(model);
                }
            });
        }
        else {
            // Make all controls dirty to show validation errors
            for (const i in this.searchForm.controls) {
                if (this.searchForm.controls.hasOwnProperty(i)) {
                    this.searchForm.controls[i].markAsDirty();
                }
            }
        }
    }

    createAndNavigateToForm(model: FormModel) {
        this.service.createForm(this.userId, model.moneyManager, model.dateOfDance).then(u => {
            this.router.navigate(['form', 'entry', u]);
        });
    }
}
