import { Strategy } from '../../models/login.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AbstractAuthProvider } from '../../providers/abstract-auth.provider';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    isNavbarCollapsed = true;
    get strategyIcon(): string {
        switch (this.authProvider.loginInfo.strategy) {
            case Strategy.Basic:
                return 'fa fa-user';
            case Strategy.Facebook:
                return 'fa fa-facebook';
            case Strategy.Github:
                return 'fa fa-github';
            case Strategy.Google:
                return 'fa fa-google';
            default:
                return '';
        }
    }

    constructor(
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.authProvider.authEvent.subscribe(loggedIn => {
            if (!loggedIn) {
                this.router.navigate(['auth', 'login']);
            }
        });
    }

}
