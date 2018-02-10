import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OAuthLoginModel } from '../../../framework/models/login.model';
import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-oauth-success',
    templateUrl: './oauth-success.component.html',
    styleUrls: ['./oauth-success.component.scss']
})
export class OauthSuccessComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        const p = this.route.snapshot.queryParams;
        const auth = new OAuthLoginModel(p.userId, p.username, p.authId, p.access_token);
        auth.strategy = p.strategy;
        auth.refreshToken = p.refresh_token;
        this.authProvider.storeOAuth(auth);
        setTimeout(() => this.router.navigateByUrl(''), 5000);
    }
}
