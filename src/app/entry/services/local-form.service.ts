import { Injectable } from '@angular/core';

import { DateModel } from '../../framework/models/date.model';
import { AbstractStorageProvider } from '../../framework/providers/abstract-storage.provider';
import { FormModel, FormStatus } from '../models/form.model';
import { AbstractFormService } from './abstract-form.service';

@Injectable()
export class LocalFormService implements AbstractFormService {
    private static readonly STORAGE_KEY = 'HACDA_FORMS';

    constructor(
        private storage: AbstractStorageProvider
    ) { }

    public getForm(id: string): Promise<FormModel> {
        const form = this.getAllForms().find(x => x.uniqueId === id);
        return Promise.resolve(form);
    }

    public findForm(dateOfDance: DateModel): Promise<FormModel> {
        const form = this.getAllForms().find(x => x.dateOfDance.equalsDateOnly(dateOfDance));
        return Promise.resolve(form);
    }

    public createForm(userId: string, moneyManager: string, dateOfDance: DateModel): Promise<string> {
        let form = this.getAllForms().find(x => x.moneyManagers.indexOf(moneyManager) > -1 && x.dateOfDance.equalsDateOnly(dateOfDance));
        if (form) {
            console.error(`Form by ${moneyManager} on ${dateOfDance} already exists.`);
        }

        form = new FormModel((new Date()).getTime().toString(), userId, moneyManager, dateOfDance);
        this.saveForm(form);
        return Promise.resolve(form.uniqueId);
    }

    public updateForm(form: FormModel): Promise<void> {
        form.status = FormStatus.Active;
        this.saveForm(form);
        return Promise.resolve();
    }

    public validateForm(form: FormModel): Promise<void> {
        form.status = FormStatus.Validated;
        this.saveForm(form);
        return Promise.resolve();
    }

    public signForm(form: FormModel, signedBy: string, signature: string): Promise<void> {
        form.signedBy = signedBy;
        form.signature = signature;
        form.status = FormStatus.Submitted;
        this.saveForm(form);
        return Promise.resolve();
    }

    public submitForm(form: FormModel): Promise<void> {
        form.status = FormStatus.Submitted;
        this.saveForm(form);
        return Promise.resolve();
    }

    public deleteForm(uniqueId: string): Promise<void> {
        const forms = this.getAllForms();
        const idx = forms.findIndex(x => x.uniqueId === uniqueId);
        if (idx > -1) {
            forms.splice(idx, 1);
        }

        this.saveAllForms(forms);
        return Promise.resolve();
    }

    private saveForm(form: FormModel) {
        const forms = this.getAllForms();
        const savedForm = forms.find(x => x.uniqueId === form.uniqueId);
        if (savedForm) {
            form.copyTo(savedForm);
        }
        else {
            forms.push(form);
        }

        this.saveAllForms(forms);
    }

    private getAllForms(): FormModel[] {
        let forms = this.storage.getItem<FormModel[]>(LocalFormService.STORAGE_KEY);
        if (!forms) {
            forms = [];
        }

        return forms.map(x => {
            const form = new FormModel(x.uniqueId);
            form.moneyManagers = x.moneyManagers ? x.moneyManagers : [];
            form.status = x.status || FormStatus.New;
            form.dateOfDance = x.dateOfDance ? new DateModel(x.dateOfDance) : new DateModel();
            form.membershipNames = x.membershipNames || '';
            form.isTechno = !!x.isTechno;
            form.location = x.location;
            form.startingCash = x.startingCash || 0;
            form.endingCash = x.endingCash || 0;
            form.donations = x.donations || 0;
            form.bandMemberCount = x.bandMemberCount || 0;
            form.bandName = x.bandName || '';
            form.bandSound = !!x.bandSound;
            form.performers = x.performers ? x.performers : {};
            form.performerPayments = x.performerPayments ? x.performerPayments : {};
            form.danceManager = !!x.danceManager;
            form.danceManagerName = x.danceManagerName || '';
            form.soundManager = !!x.soundManager;
            form.soundManagerName = x.soundManagerName || '';
            form.hospitalityHost = !!x.hospitalityHost;
            form.hospitalityHostName = x.hospitalityHostName || '';
            form.amountAdded = x.amountAdded || 0;
            form.cashAddedBy = x.cashAddedBy || '';
            form.cashBoxHeldBy = x.cashBoxHeldBy || '';
            form.signedBy = x.signedBy || '';
            form.signature = x.signature || '';
            form.counts = x.counts ? x.counts : {};
            form.checks = x.checks ? x.checks.map(c => {
                return {
                    checkNumber: c.checkNumber,
                    payer: c.payer,
                    reason: c.reason,
                    amount: c.amount,
                    dated: new DateModel(c.dated)
                };
            }) : [];
            return form;
        });
    }

    private saveAllForms(forms: FormModel[]): void {
        const savedForms = forms.map(x => {
            return {
                uniqueId: x.uniqueId,
                moneyManagers: x.moneyManagers,
                status: x.status,
                dateOfDance: x.dateOfDance.milliseconds,
                membershipNames: x.membershipNames,
                isTechno: x.isTechno,
                location: x.location,
                startingCash: x.startingCash,
                endingCash: x.endingCash,
                donations: x.donations,
                bandMemberCount: x.bandMemberCount,
                bandName: x.bandName,
                bandSound: x.bandSound,
                performers: x.performers,
                performerPayments: x.performerPayments,
                danceManager: x.danceManager,
                danceManagerName: x.danceManagerName,
                soundManager: x.soundManager,
                soundManagerName: x.soundManagerName,
                hospitalityHost: x.hospitalityHost,
                hospitalityHostName: x.hospitalityHostName,
                amountAdded: x.amountAdded,
                cashAddedBy: x.cashAddedBy,
                cashBoxHeldBy: x.cashBoxHeldBy,
                signedBy: x.signedBy,
                signature: x.signature,
                counts: x.counts,
                checks: x.checks ? x.checks.map(c => {
                    return {
                        checkNumber: c.checkNumber,
                        payer: c.payer,
                        reason: c.reason,
                        amount: c.amount,
                        dated: c.dated.milliseconds
                    };
                }) : []
            };
        });
        this.storage.setItem<any[]>(LocalFormService.STORAGE_KEY, savedForms);
    }
}
