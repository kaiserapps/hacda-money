import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-failure',
    templateUrl: './failure.component.html',
    styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

    constructor(
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.authProvider.logout();
        setTimeout(() => this.router.navigateByUrl('../login'), 5000);
    }
}
