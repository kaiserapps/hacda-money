import { RouterModule } from '@angular/router';

import { FailureComponent } from './components/failure/failure.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { OauthSuccessComponent } from './components/oauth-success/oauth-success.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SuccessComponent } from './components/success/success.component';

const authRoutes = [
    {
        path: 'auth',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/login/:info',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },
    {
        path: 'auth/success',
        component: SuccessComponent
    },
    {
        path: 'auth/success/oauth',
        component: OauthSuccessComponent
    },
    {
        path: 'auth/failure',
        component: FailureComponent
    },
    {
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'auth/reset-password/:token',
        component: ResetPasswordComponent
    }
];

export const AuthRouting = RouterModule.forChild(authRoutes);
