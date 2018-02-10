import { DateModel } from '../../framework/models/date.model';
import { CheckModel } from './check.model';

export class FormModel {
    private _id: string;
    public status: FormStatus;
    public dateOfDanceMilliseconds: number;
    public isTechno: boolean;
    public location: string;
    public startingCash: number;
    public endingCash: number;
    public donations: number;
    public userIds: string[];
    public moneyManagers: string[];
    public membershipNames: string;
    public bandMemberCount: number;
    public bandName: string;
    public bandSound: boolean;
    public performers: { [key: number]: string };
    public performerPayments: { [key: number]: number };
    public danceManager: boolean;
    public danceManagerName: string;
    public soundManager: boolean;
    public soundManagerName: string;
    public hospitalityHost: boolean;
    public hospitalityHostName: string;
    public amountAdded: number;
    public cashAddedBy: string;
    public cashBoxHeldBy: string;
    public signedBy: string;
    public signature: string;
    public checks: CheckModel[];
    public counts: { [key: number]: number };

    public static copyForm(from: FormModel, to: FormModel): FormModel {
        if (!from) {
            return to;
        }
        if (!to) {
            to = new FormModel();
        }
        to.dateOfDanceMilliseconds = from.dateOfDanceMilliseconds;
        to.status = from.status;
        to.isTechno = from.isTechno;
        to.location = from.location;
        to.startingCash = from.startingCash;
        to.endingCash = from.endingCash;
        to.donations = from.donations;
        to.userIds = from.userIds;
        to.moneyManagers = from.moneyManagers;
        to.membershipNames = from.membershipNames;
        to.bandMemberCount = from.bandMemberCount;
        to.bandName = from.bandName;
        to.bandSound = from.bandSound;
        to.performers = from.performers;
        to.performerPayments = from.performerPayments;
        to.danceManager = from.danceManager;
        to.danceManagerName = from.danceManagerName;
        to.soundManager = from.soundManager;
        to.soundManagerName = from.soundManagerName;
        to.hospitalityHost = from.hospitalityHost;
        to.hospitalityHostName = from.hospitalityHostName;
        to.amountAdded = from.amountAdded;
        to.cashAddedBy = from.cashAddedBy;
        to.cashBoxHeldBy = from.cashBoxHeldBy;
        to.signedBy = from.signedBy;
        to.signature = from.signature;
        to.checks = from.checks;
        to.counts = from.counts;
        return to;
    }

    constructor(form: FormModel);
    constructor(
        uniqueId?: string,
        userId?: string,
        moneyManager?: string,
        dateOfDance?: DateModel,
    );
    constructor(
        formOrUniqueId: FormModel | string,
        userId?: string,
        moneyManager?: string,
        dateOfDance?: DateModel,
    ) {
        if (typeof formOrUniqueId === 'string') {
            this.uniqueId = formOrUniqueId;
            this.status = FormStatus.New;
            this.dateOfDance = dateOfDance;
            this.location = 'Christ the Savior Orthodox Church';
            this.startingCash = 300;
            this.endingCash = 0;
            this.donations = 0;
            this.userIds = [userId];
            this.moneyManager = moneyManager;
            this.membershipNames = '';
            this.isTechno = false;
            this.performers = {};
            this.performerPayments = {};
            this.bandMemberCount = 2;
            this.danceManager = true;
            this.soundManager = true;
            this.hospitalityHost = true;
            this.amountAdded = 0;
            this.cashAddedBy = '';
            this.cashBoxHeldBy = '';
            this.checks = [];
            this.counts = {};
        }
        else {
            FormModel.copyForm(formOrUniqueId, this);
        }
    }

    public copyTo(form: FormModel): FormModel {
        return FormModel.copyForm(this, form);
    }

    public get statusDesc(): string {
        return FormStatus[this.status];
    }

    public get uniqueId(): string {
        return this._id;
    }

    public set uniqueId(id: string) {
        this._id = id;
    }

    public get dateOfDance(): DateModel {
        return new DateModel(this.dateOfDanceMilliseconds);
    }

    public set dateOfDance(m: DateModel) {
        this.dateOfDanceMilliseconds = m.milliseconds;
    }

    public get totalIncome(): number {
        return this.donations +
            (this.counts ?
                (this.counts[CountType.Techno] * 10) +
                (this.counts[CountType.Member] * 8) +
                (this.counts[CountType.Nonmember] * 9) +
                (this.counts[CountType.Student] * 5) +
                (this.counts[CountType.Listener] * 5) +
                (this.counts[CountType.Membership] * 20) : 0);
    }

    public get totalChecks(): number {
        if (this.checks.length) {
            return this.checks.map(x => x.amount).reduce((sum, current) => sum + current);
        }
        else {
            return 0;
        }
    }

    public get totalCash(): number {
        return this.totalIncome - this.totalChecks;
    }

    public get callerPayment(): number {
        return this.performerPayments[PerformerType.Caller] || 0;
    }

    public get soundPayment(): number {
        return this.performerPayments[PerformerType.Sound] || 0;
    }

    public get bandPayment(): number {
        let total = this.performerPayments[PerformerType.BandMember1] || 0;
        if (this.bandMemberCount >= 2) {
            total += this.performerPayments[PerformerType.BandMember2] || 0;
        }
        if (this.bandMemberCount >= 3) {
            total += this.performerPayments[PerformerType.BandMember3] || 0;
        }
        if (this.bandMemberCount >= 4) {
            total += this.performerPayments[PerformerType.BandMember4] || 0;
        }
        return total;
    }

    public get bandMemberNames(): string {
        const bandMembers = [];
        if (this.performers[PerformerType.BandMember1]) {
            bandMembers.push(this.performers[PerformerType.BandMember1]);
        }
        if (this.bandMemberCount >= 2) {
            if (this.performers[PerformerType.BandMember2]) {
                bandMembers.push(this.performers[PerformerType.BandMember2]);
            }
        }
        if (this.bandMemberCount >= 3) {
            if (this.performers[PerformerType.BandMember3]) {
                bandMembers.push(this.performers[PerformerType.BandMember3]);
            }
        }
        if (this.bandMemberCount >= 4) {
            if (this.performers[PerformerType.BandMember4]) {
                bandMembers.push(this.performers[PerformerType.BandMember4]);
            }
        }
        return bandMembers.join(', ');
    }

    public get performerPayment(): number {
        return this.callerPayment + this.soundPayment + this.bandPayment;
    }

    public get finalCash(): number {
        return this.endingCash - this.performerPayment;
    }

    public get totalCashAndChecks(): number {
        return this.startingCash + this.totalIncome - this.performerPayment;
    }

    public get cashBalance(): number {
        return this.finalCash - 300;
    }

    public get netIncome(): number {
        return this.cashBalance + this.totalChecks;
    }

    public get leftInCashBox(): number {
        if (this.cashBalance >= 0) {
            return this.totalCashAndChecks - this.netIncome;
        }
        else {
            return this.finalCash + this.amountAdded;
        }
    }

    public get moneyManager(): string {
        return this.moneyManagers.join(', ');
    }

    public set moneyManager(mgr: string) {
        this.moneyManagers = [mgr];
    }

    public get membershipNameList(): string {
        if (!this.membershipNames) {
            return '';
        }
        else {
            const names = this.membershipNames.replace( /\n|\r|\r\n/g, ',').split(',');
            return names.filter(x => !!x).join(', ');
        }
    }

    public addManager(id: string, mgr: string) {
        if (this.userIds.indexOf(id) === -1) {
            this.userIds.push(id);
        }
        if (this.moneyManagers.indexOf(mgr) === -1) {
            this.moneyManagers.push(mgr);
        }
    }

    public incrementCount(type: CountType) {
        this.counts[type] = this.counts[type] || 0;
        this.counts[type]++;
    }

    public changeCount(type: CountType, amount: number) {
        this.counts[type] = amount;
    }
}

export enum FormStatus {
    New,
    Active,
    Validated,
    Signed,
    Submitted,
    Approved
}

export enum PerformerType {
    None,
    BandMember1,
    BandMember2,
    BandMember3,
    BandMember4,
    Caller,
    Sound
}

export enum CountType {
    None,
    Member,
    Nonmember,
    Techno,
    Student,
    Listener,
    Child,
    Membership,
    CouponIn,
    CouponOut
}
