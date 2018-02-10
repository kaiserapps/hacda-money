import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import { Md5 } from 'ts-md5/dist/md5';
import * as uuid4 from 'uuid/v4';

import { AbstractEnvironment } from '../../../environments/abstract-environment';
import * as HTTP from '../../framework/functions/http';
import { AbstractLoginModel, HttpLoginModel, OAuthLoginModel, Strategy } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { AbstractAuthProvider } from './abstract-auth.provider';
import { AbstractStorageProvider } from './abstract-storage.provider';

@Injectable()
export class AuthProvider implements AbstractAuthProvider {
    private static LOGIN_INFO_KEY = 'HACDA_LOGININFO';
    private _loginInfo: AbstractLoginModel;
    private _authEvent: Observable<boolean>;
    private _authObs: Observer<boolean>;

    constructor(
        private http: Http,
        private storage: AbstractStorageProvider,
        private environment: AbstractEnvironment
    ) {
        const evt = new Observable<boolean>(obs => this._authObs = obs).publish();
        evt.connect();
        this._authEvent = evt;
    }

    public get authEvent(): Observable<boolean> {
        return this._authEvent;
    }

    public get loginInfo(): AbstractLoginModel {
        if (this._loginInfo === undefined) {
            this._loginInfo = this.storage.getItem<AbstractLoginModel>(AuthProvider.LOGIN_INFO_KEY);
        }

        return this._loginInfo;
    }

    public logout(): void {
        this.storage.removeItem(AuthProvider.LOGIN_INFO_KEY);
        this._loginInfo = null;
        this._authObs.next(false);
    }

    public storeOAuth(loginModel: OAuthLoginModel): void {
        this.storage.setItem<AbstractLoginModel>(AuthProvider.LOGIN_INFO_KEY, loginModel);
        this._loginInfo = loginModel;
        this._authObs.next(true);
    }

    public login(loginModel: HttpLoginModel): Promise<{} | UserModel> {
        return this.getHttpAuthStrategy().then(strategyId => {
            loginModel.strategy = strategyId;
            let promise: Promise<{} | UserModel>;
            if (strategyId === Strategy.Basic) {
                loginModel.authHeader = `Basic ${btoa(`${loginModel.username}:${loginModel.password}`)}`;
                promise = this.http.get(`${this.environment.restApiUrl}/auth/${strategyId}`, {
                    headers: new Headers({
                        Authorization: loginModel.authHeader
                    })
                })
                .map(x => {
                    const user = new UserModel(x.json() as UserModel);
                    loginModel.username = user.name;
                    return user;
                })
                .catch(err => { throw HTTP.handleError(err); })
                .toPromise();
            }

            return promise.then(response => {
                this.storage.setItem<AbstractLoginModel>(AuthProvider.LOGIN_INFO_KEY, loginModel);
                this._loginInfo = loginModel;
                this._authObs.next(true);
                return response;
            });
        });
    }

    public register(email: string, displayName: string): Promise<{}> {
        return this.http.post(`${this.environment.restApiUrl}/auth/register`, {
            email: email,
            displayName: displayName
        })
        .catch(err => { throw HTTP.handleError(err); })
        .toPromise();
    }

    public forgotPass(email: string): Promise<{ message: string}> {
        return this.http.post(`${this.environment.restApiUrl}/auth/forgot`, {
            email: email
        })
        .map(res => res.json())
        .catch(err => { throw HTTP.handleError(err); })
        .toPromise();
    }

    public setPass(token: string, password: string): Promise<{}> {
        return this.http.post(`${this.environment.restApiUrl}/auth/reset`, {
            passwordResetToken: token,
            password: password
        })
        .catch(err => { throw HTTP.handleError(err); })
        .toPromise();
    }

    public addAuthHeader(url: string, headers?: Headers): Headers {
        if (!headers) {
            headers = new Headers();
        }

        const auth = this.storage.getItem<AbstractLoginModel>(AuthProvider.LOGIN_INFO_KEY);
        headers.set('strategy', auth.strategy);
        switch (auth.strategy) {
            case Strategy.Basic:
                headers.set('Authorization', auth.authHeader);
                break;
            default:
                const oauth = auth as OAuthLoginModel;
                headers.set('access_token', oauth.accessToken);
                headers.set('refresh_token', oauth.refreshToken);
        }

        return headers;
    }

    private getHttpAuthStrategy(): Promise<string> {
        return this.http.get(`${this.environment.restApiUrl}/auth/strategies/http`)
        .map(x => x.json() as string)
        .toPromise();
    }

    private getAllAuthStrategies(): Promise<string[]> {
        return this.http.get(`${this.environment.restApiUrl}/auth/strategies`)
        .map(x => x.json() as string[])
        .toPromise();
    }
}
