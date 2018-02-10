import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AbstractAuthProvider } from '../../../framework/providers/abstract-auth.provider';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    error: string;

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get displayName(): FormControl {
        return this.registerForm.get('displayName') as FormControl;
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authProvider: AbstractAuthProvider
    ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, EmailValidator]],
            displayName: ['', Validators.required]
        });
    }

    submit() {
        this.error = '';
        if (this.registerForm.valid) {
            this.authProvider.register(this.email.value, this.displayName.value).then(() => {
                this.router.navigate(['auth', 'login', 'Registration Successful. Please check your email for a link that will allow you to set your password.']);
            }).catch(err => this.error = err);
        }
    }
}
