import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CountType, FormModel } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

export class MembershipBalance {
    techno: number;
    member: number;
    nonmember: number;
    student: number;
    listener: number;
    membership: number;
}

@Component({
    selector: 'app-attendance-balance',
    templateUrl: './attendance-balance.component.html',
    styleUrls: ['./attendance-balance.component.scss']
})
export class AttendanceBalanceComponent implements OnInit {
    CountType = CountType;
    matchingBalances: MembershipBalance[] = [];
    targetIncome: number;

    get moneyForm(): FormModel {
        return this.parent.moneyForm;
    }

    get member(): number {
        return this.moneyForm.counts[CountType.Member];
    }

    set member(n: number) {
        this.moneyForm.counts[CountType.Member] = n;
    }

    get nonmember(): number {
        return this.moneyForm.counts[CountType.Nonmember];
    }

    set nonmember(n: number) {
        this.moneyForm.counts[CountType.Nonmember] = n;
    }

    get techno(): number {
        return this.moneyForm.counts[CountType.Techno];
    }

    set techno(n: number) {
        this.moneyForm.counts[CountType.Techno] = n;
    }

    get student(): number {
        return this.moneyForm.counts[CountType.Student];
    }

    set student(n: number) {
        this.moneyForm.counts[CountType.Student] = n;
    }

    get listener(): number {
        return this.moneyForm.counts[CountType.Listener];
    }

    set listener(n: number) {
        this.moneyForm.counts[CountType.Listener] = n;
    }

    get membership(): number {
        return this.moneyForm.counts[CountType.Membership];
    }

    set membership(n: number) {
        this.moneyForm.counts[CountType.Membership] = n;
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
        this.init();
        this.parent.formReady.subscribe(() => this.init());
    }

    init() {
        if (this.parent.moneyForm) {
            this.targetIncome = this.moneyForm.endingCash + this.moneyForm.totalChecks - this.moneyForm.startingCash;
            for (let t = this.subtract(this.techno, 5); t < this.techno + 5; t++) {
                if (!this.parent.moneyForm.isTechno && t !== 0) {
                    continue;
                }

                for (let m = this.subtract(this.member, 5); m < this.member + 5; m++) {
                    if (this.parent.moneyForm.isTechno && m !== 0) {
                        continue;
                    }

                    for (let nm = this.subtract(this.nonmember, 5); nm < this.nonmember + 5; nm++) {
                        if (this.parent.moneyForm.isTechno && nm !== 0) {
                            continue;
                        }

                        for (let s = this.subtract(this.student, 5); s < this.student + 5; s++) {
                            if (this.parent.moneyForm.isTechno && s !== 0) {
                                continue;
                            }

                            for (let l = this.subtract(this.listener, 5); l < this.listener + 5; l++) {
                                for (let mem = this.subtract(this.membership, 5); mem < this.membership + 5; mem++) {
                                    if (t * 10 + m * 8 + nm * 9 + s * 5 + l * 5 + mem * 20 === this.targetIncome) {
                                        this.matchingBalances.push({
                                            techno: t,
                                            member: m,
                                            nonmember: nm,
                                            student: s,
                                            listener: l,
                                            membership: mem,
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }

            this.matchingBalances.sort((a, b) => {
                const devA = this.deviation(a);
                const devB = this.deviation(b);
                return devA > devB ? 1 : (devA < devB ? -1 : 0);
            });
        }
    }

    deviation(m: MembershipBalance) {
        return Math.abs(this.listener - m.listener) +
        Math.abs(this.member - m.member) +
        Math.abs(this.membership - m.membership) +
        Math.abs(this.nonmember - m.nonmember) +
        Math.abs(this.student - m.student) +
        Math.abs(this.techno - m.techno);
    }

    subtract(num: number, diff: number): number {
        return num - diff < 0 ? 0 : num - diff;
    }

    selectAttendance(b: MembershipBalance): void {
        this.member = b.member;
        this.nonmember = b.nonmember;
        this.student = b.student;
        this.techno = b.techno;
        this.listener = b.listener;
        this.membership = b.membership;
        this.service.updateForm(this.moneyForm);
        this.router.navigate(['../submission'], { relativeTo: this.route });
    }
}
