import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    token: string;
    setPassForm: FormGroup;
    error: string;

    get password(): FormControl {
        return this.setPassForm.get('password') as FormControl;
    }

    get passwordConfirm(): FormControl {
        return this.setPassForm.get('passwordConfirm') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.token = this.route.snapshot.params['token'];
        this.setPassForm = this.fb.group({
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        });
    }

    submit() {
        this.error = '';
        if (this.password.value !== this.passwordConfirm.value) {
            this.error = 'The passwords must match.';
            return;
        }

        if (this.setPassForm.valid) {
            this.authProvider.setPass(this.token, this.password.value).then(() => {
                this.router.navigate(['auth', 'login', 'Account activated. Please log in.']);
            }).catch(err => this.error = err);
        }
    }

}
