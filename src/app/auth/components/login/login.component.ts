import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractEnvironment } from '../../../../environments/abstract-environment';
import { HttpLoginModel } from '../../../framework/models/login.model';
import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    error: string;
    info: string;

    get email(): FormControl {
        return this.loginForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private environment: AbstractEnvironment,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.info = this.route.snapshot.params['info'];
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, EmailValidator]],
            password: ['', Validators.required]
        });
    }

    submit() {
        if (this.loginForm.valid) {
            const auth = new HttpLoginModel(this.email.value, this.email.value, this.password.value);
            this.authProvider.login(auth).then(user => {
                if (user) {
                    this.router.navigate(['auth', 'success']);
                }
            }).catch(err => this.error = err);
        }
    }
}
