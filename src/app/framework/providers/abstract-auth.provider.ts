import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AbstractLoginModel, HttpLoginModel, OAuthLoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';

export abstract class AbstractAuthProvider {
    abstract authEvent: Observable<boolean>;
    abstract loginInfo: AbstractLoginModel;
    abstract logout(): void;
    abstract login(loginModel: HttpLoginModel): Promise<{} | UserModel>;
    abstract storeOAuth(loginModel: OAuthLoginModel): void;
    abstract register(email: string, displayName: string): Promise<{}>;
    abstract forgotPass(email: string): Promise<{ message: string}>;
    abstract setPass(token: string, password: string): Promise<{}>;
    abstract addAuthHeader(url: string, headers?: Headers): Headers;
}
