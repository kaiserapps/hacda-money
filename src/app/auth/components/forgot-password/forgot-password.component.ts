import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPassForm: FormGroup;
    error: string;

    get email(): FormControl {
        return this.forgotPassForm.get('email') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.forgotPassForm = this.fb.group({
            email: ['', [Validators.required, EmailValidator]]
        });
    }

    submit() {
        this.error = '';
        if (this.forgotPassForm.valid) {
            this.authProvider.forgotPass(this.email.value).then(response => {
                this.router.navigate(['auth', 'login', response.message]);
            }).catch(err => this.error = err);
        }
    }
}
