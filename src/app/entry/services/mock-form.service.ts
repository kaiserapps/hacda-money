import { Injectable } from '@angular/core';

import { DateModel } from '../../framework/models/date.model';
import { FormModel } from '../models/form.model';
import { AbstractFormService } from './abstract-form.service';

@Injectable()
export class MockFormService implements AbstractFormService {
    public getForm(id: string): Promise<FormModel> {
        return this.findForm(new DateModel());
    }

    public findForm(dateOfDance: DateModel): Promise<FormModel> {
        return Promise.resolve(new FormModel(dateOfDance.milliseconds.toString(), '12345', 'Test User', dateOfDance));
    }

    public createForm(userId: string, moneyManager: string, dateOfDance: DateModel): Promise<string> {
        return Promise.resolve('');
    }

    public updateForm(form: FormModel): Promise<void> {
        return Promise.resolve();
    }

    public validateForm(form: FormModel): Promise<void> {
        return Promise.resolve();
    }

    public signForm(form: FormModel, signedBy: string, signature: string): Promise<void> {
        return Promise.resolve();
    }

    public submitForm(form: FormModel): Promise<void> {
        return Promise.resolve();
    }

    public deleteForm(uniqueId: string): Promise<void> {
        return Promise.resolve();
    }
}
