import * as moment from 'moment';

export class DateModel {
    private _moment: moment.Moment;

    constructor(date?: number | Date | string | DateModel) {
        if (!date) {
            date = new Date();
        }

        if (typeof date === 'object') {
            if (!(date instanceof Date)) {
                date = date.toString();
            }
        }

        this._moment = moment(date);
    }

    public get milliseconds(): number {
        return this.date.getTime();
    }

    public set milliseconds(m: number) {
        this._moment = moment(m);
    }

    public get date(): Date {
        return this._moment.toDate();
    }

    public set date(d: Date) {
        this._moment = moment(d);
    }

    public equals(d: DateModel): boolean {
        return this.milliseconds === d.milliseconds;
    }

    public equalsDateOnly(d: DateModel): boolean {
        return this.toDateString() === d.toDateString();
    }

    public toString(): string {
        return this.toDateTimeString();
    }

    public toDateTimeString(): string {
        return this._moment.format('MM/DD/YYYY HH:mm:ss');
    }

    public toDateString(): string {
        return this._moment.format('MM/DD/YYYY');
    }

    public toTimeString(): string {
        return this._moment.format('HH:mm:ss');
    }

    public toHTMLdate(): string {
        return this._moment.format('YYYY-MM-DD');
    }
}
