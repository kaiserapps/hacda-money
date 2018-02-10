import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-submission-error',
    templateUrl: './submission-error.component.html',
    styleUrls: ['./submission-error.component.scss']
})
export class SubmissionErrorComponent implements OnInit {
    @Input() errors: { [key: string]: number } = {};
    @Input() errorColors: { [key: string]: string } = {};
    @Input() errorList: [string, string][] = [];
    @Input() errorId: string;

    constructor() { }

    ngOnInit() {
    }

}
