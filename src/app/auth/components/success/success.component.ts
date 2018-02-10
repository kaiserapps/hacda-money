import { OAuthLoginModel } from '../../../framework/models/login.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        setTimeout(() => this.router.navigateByUrl(''), 5000);
    }
}
