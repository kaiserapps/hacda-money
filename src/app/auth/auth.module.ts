import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FrameworkModule } from '../framework/framework.module';
import { AuthRouting } from './auth.routing';
import { FailureComponent } from './components/failure/failure.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OauthSuccessComponent } from './components/oauth-success/oauth-success.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FrameworkModule,
        AuthRouting
    ],
    declarations: [RegisterComponent, LoginComponent, SuccessComponent, FailureComponent, ResetPasswordComponent, OauthSuccessComponent, ForgotPasswordComponent]
})
export class AuthModule { }
