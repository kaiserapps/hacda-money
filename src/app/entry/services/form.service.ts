import '../../../rxjs-operators';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AbstractEnvironment } from '../../../environments/abstract-environment';
import * as HTTP from '../../framework/functions/http';
import { DateModel } from '../../framework/models/date.model';
import { AbstractAuthProvider } from '../../framework/providers/abstract-auth.provider';
import { AbstractStorageProvider } from '../../framework/providers/abstract-storage.provider';
import { FormModel, FormStatus } from '../models/form.model';
import { AbstractFormService } from './abstract-form.service';

@Injectable()
export class FormService implements AbstractFormService {
    constructor(
        private http: Http,
        private environment: AbstractEnvironment,
        private storage: AbstractStorageProvider,
        private authProvider: AbstractAuthProvider
    ) { }

    public getForm(id: string): Promise<FormModel> {
        return this.http.get(`${this.environment.restApiUrl}/forms/${id}`)
        .map(x => new FormModel(x.json() as FormModel))
        .toPromise();
    }

    public findForm(dateOfDance: DateModel): Promise<FormModel> {
        return this.http.get(`${this.environment.restApiUrl}/forms/bydate/${dateOfDance.milliseconds}`)
        .map(x => new FormModel(x.json() as FormModel))
        .toPromise();
    }

    public createForm(userId: string, moneyManager: string, dateOfDance: DateModel): Promise<string> {
        const url = `/forms`;
        return this.http.post(this.environment.restApiUrl + url, {
            dateOfDanceMilliseconds: dateOfDance.milliseconds,
            userIds: [userId],
            moneyManagers: [moneyManager]
        }, {
            headers: this.authProvider.addAuthHeader(url)
        })
        .map(x => x.json() as string)
        .toPromise();
    }

    public updateForm(form: FormModel): Promise<void> {
        const url = `/forms/${form.uniqueId}`;
        return this.http.put(`${this.environment.restApiUrl}/forms/${form.uniqueId}`, form, {
            headers: this.authProvider.addAuthHeader(url)
        })
        .map(x => {})
        .toPromise();
    }

    public validateForm(form: FormModel): Promise<void> {
        form.status = FormStatus.Validated;
        return this.updateForm(form);
    }

    public signForm(form: FormModel, signedBy: string, signature: string): Promise<void> {
        form.signedBy = signedBy;
        form.signature = signature;
        form.status = FormStatus.Signed;
        return this.updateForm(form);
    }

    public submitForm(form: FormModel): Promise<void> {
        form.status = FormStatus.Submitted;
        return this.updateForm(form);
    }

    public deleteForm(uniqueId: string): Promise<void> {
        const url = `/forms/${uniqueId}`;
        return this.http.delete(`${this.environment.restApiUrl}/forms/${uniqueId}`, {
            headers: this.authProvider.addAuthHeader(url)
        })
        .map(x => {})
        .toPromise();
    }
}
