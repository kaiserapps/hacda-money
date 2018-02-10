import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
    selector: 'app-signature-pad',
    templateUrl: './signature-pad.component.html',
    styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent {

    private _signaturePadOptions: Object = {
        'canvasWidth': 800,
        'canvasHeight': 300
    };

    invalidSig = false;
    dataUrl: string;

    @ViewChild(SignaturePad) signaturePad: SignaturePad;
    @Output() public signed = new EventEmitter<string>();

    constructor(
        public activeModal: NgbActiveModal
    ) { }

    drawStart() {
        this.invalidSig = false;
    }

    drawComplete() {
        this.dataUrl = this.signaturePad.toDataURL();
    }

    sign() {
        if (this.dataUrl) {
            this.signed.emit(this.dataUrl);
        }
        else {
            this.invalidSig = true;
        }
    }

    clear() {
        this.signaturePad.clear();
    }
}
