import { Component, OnInit, ViewChild } from '@angular/core';

import { SignatureModalComponent } from '../../../framework/components/signature-modal/signature-modal.component';
import { CheckReason } from '../../models/check.model';
import { CountType, FormModel, PerformerType } from '../../models/form.model';
import { AbstractFormService } from '../../services/abstract-form.service';
import { FormOverviewComponent } from '../form-overview/form-overview.component';

@Component({
    selector: 'app-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
    PerformerType = PerformerType;
    CheckReason = CheckReason;
    CountType = CountType;
    errors: { [key: string]: number } = {};
    errorColors: { [key: string]: string } = {};
    errorList: [string, string][] = [];
    signAttempted = false;
    balanceRequired = false;

    @ViewChild(SignatureModalComponent) signaturePad: SignatureModalComponent;

    get moneyForm(): FormModel {
        return this.parent.moneyForm;
    }

    constructor(
        private parent: FormOverviewComponent,
        private service: AbstractFormService
    ) { }

    ngOnInit() {
    }

    validateForm() {
        let valid = true;
        this.balanceRequired = false;

        if (!this.moneyForm.location) {
            this.addError('location-name', `The Location is required.`);
            valid = false;
        }

        if (!this.moneyForm.performers[PerformerType.Caller]) {
            this.addError('caller-name', `The Caller Name is required.`);
            valid = false;
        }

        if (!this.moneyForm.bandName) {
            this.addError('band-name', `The Band Name is required.`);
            valid = false;
        }

        if (this.moneyForm.bandMemberNames.split(',').length < this.moneyForm.bandMemberCount) {
            this.addError('band-miscount', `Not all Band Member names were identified.`);
            valid = false;
        }

        if (this.moneyForm.membershipNameList.split(',').filter(x => !!x).length !== this.moneyForm.counts['membership']) {
            this.addError('membership-miscount', `The number of new/renewed Membership Names must equal the Memberships Paid count.`);
            valid = false;
        }

        if (this.moneyForm.danceManager && !this.moneyForm.danceManagerName) {
            this.addError('dance-mgr-name', `The Dance Manager Name is required (or uncheck the box).`);
            valid = false;
        }

        if (this.moneyForm.soundManager && !this.moneyForm.soundManagerName) {
            this.addError('sound-mgr-name', `The Sound Technician Name is required (or uncheck the box).`);
            valid = false;
        }

        if (this.moneyForm.hospitalityHost && !this.moneyForm.hospitalityHostName) {
            this.addError('host-name', `The Hospitality Host Name is required (or uncheck the box).`);
            valid = false;
        }

        if (this.moneyForm.startingCash !== 300) {
            this.addWarning('cash-not-300', `The Cash to Start ($${this.moneyForm.startingCash}) is not $300. By signing, you will be indicating that you recieved the Cash Box without $300 in it.`);
        }

        if (this.moneyForm.endingCash !== this.moneyForm.startingCash + this.moneyForm.totalCash) {
            this.addError('gross-mismatch', `The Gross Income ($${this.moneyForm.endingCash}) must equal the Cash to Start + Total Cash Received from admissions ($${this.moneyForm.startingCash + this.moneyForm.totalCash}). Please recount the final cash amount and/or adjust the admission counts accordingly by clicking "Balance Attendance".`);
            valid = false;
            this.balanceRequired = true;
        }

        if (this.moneyForm.leftInCashBox !== 300) {
            this.addError('cash-left-not-300', `The Total Left in Cash Box ($${this.moneyForm.leftInCashBox}) must be $300.`);
            valid = false;
        }

        if (this.moneyForm.amountAdded && !this.moneyForm.cashAddedBy) {
            this.addError('added-by-missing', `Please indicate who is adding money to the Cash Box. If no one is adding the required amount, please write "Treasurer".`);
            valid = false;
        }

        if (!this.moneyForm.cashBoxHeldBy) {
            this.addError('held-by-missing', `Cash Box Held By is required.`);
            valid = false;
        }

        if (valid) {
            this.service.validateForm(this.moneyForm);
        }
    }

    addWarning(key: string, value: string) {
        this.addError(key, value, 'text-warning');
    }

    addError(key: string, value: string, colorClass?: string) {
        colorClass = colorClass || 'text-danger';
        this.errors[key] = this.errorList.length + 1;
        this.errorColors[key] = colorClass;
        this.errorList.push([value, colorClass]);
    }

    showSignaturePad() {
        if (this.moneyForm.signedBy) {
            this.signaturePad.open();
        }
    }

    sign(signature: string) {
        if (signature) {
            this.service.signForm(this.moneyForm, this.moneyForm.signedBy, signature);
        }
    }

    unsign() {
        this.moneyForm.signedBy = '';
        this.moneyForm.signature = '';
    }

    submitForm() {
        this.service.submitForm(this.moneyForm);
    }
}
