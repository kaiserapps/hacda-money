import { DateModel } from '../../framework/models/date.model';
import { FormModel } from '../models/form.model';

export abstract class AbstractFormService {
    abstract getForm(id: string): Promise<FormModel>;
    abstract findForm(dateOfDance: DateModel): Promise<FormModel>;
    abstract createForm(userId: string, moneyManager: string, dateOfDance: DateModel): Promise<string>;
    abstract updateForm(form: FormModel): Promise<void>;
    abstract validateForm(form: FormModel): Promise<void>;
    abstract signForm(form: FormModel, signedBy: string, signature: string): Promise<void>;
    abstract submitForm(form: FormModel): Promise<void>;
    abstract deleteForm(uniqueId: string): Promise<void>;
}
