import { DateModel } from '../../framework/models/date.model';

export class CheckModel {
    public checkNumber: number;
    public payer: string;
    public reason: CheckReason;
    public amount: number;
    public dated: DateModel;
}

export enum CheckReason {
    None,
    Admission,
    Membership
}
