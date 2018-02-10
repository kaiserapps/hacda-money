import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';

import { SignaturePadComponent } from '../signature-pad/signature-pad.component';

@Component({
    selector: 'app-signature-modal',
    templateUrl: './signature-modal.component.html',
    styleUrls: ['./signature-modal.component.scss']
})
export class SignatureModalComponent {

    private _signaturePad: SignaturePadComponent;
    private _modalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
    ) { }

    @Output() public signatureChange = new EventEmitter<string>();

    open() {
        this._modalRef = this.modalService.open(SignaturePadComponent, {
            backdrop: 'static',
            size: 'lg'
        });
        this._signaturePad = this._modalRef.componentInstance;
        this._signaturePad.signed.subscribe(() => {
            this.close();
        });
    }

    close() {
        this.signatureChange.emit(this._signaturePad.dataUrl);
        this._modalRef.close();
    }
}
