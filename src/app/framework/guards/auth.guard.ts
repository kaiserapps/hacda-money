import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AbstractAuthProvider } from '../providers/abstract-auth.provider';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    canActivate(): boolean {
        if (!this.authProvider.loginInfo) {
            this.router.navigate(['auth', 'login']);
            return false;
        }
        else {
            return true;
        }
    }
}
