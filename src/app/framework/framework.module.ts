import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown.module';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { SignaturePadModule } from 'angular2-signaturepad';

import { AbstractEnvironment } from '../../environments/abstract-environment';
import { environment } from '../../environments/environment';
import { ErrorComponent } from './components/error/error.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignatureModalComponent } from './components/signature-modal/signature-modal.component';
import { SignaturePadComponent } from './components/signature-pad/signature-pad.component';
import { AbstractAuthProvider } from './providers/abstract-auth.provider';
import { AbstractDialogProvider } from './providers/abstract-dialog.provider';
import { AbstractStorageProvider } from './providers/abstract-storage.provider';
import { AuthProvider } from './providers/auth.provider';
import { LocalStorageProvider } from './providers/local-storage.provider';
import { NativeDialogProvider } from './providers/native-dialog.provider';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        NgbModule,
        RouterModule,
        SignaturePadModule
    ],
    declarations: [
        ErrorComponent,
        MenuComponent,
        SignatureModalComponent,
        SignaturePadComponent
    ],
    entryComponents: [
        SignaturePadComponent
    ],
    exports: [
        CommonModule,
        HttpModule,
        NgbModule,
        MenuComponent,
        SignatureModalComponent,
    ],
    providers: [
        NgbModalStack,
        NgbDropdownConfig,
        { provide: AbstractEnvironment, useValue: environment },
        { provide: AbstractStorageProvider, useClass: LocalStorageProvider },
        { provide: AbstractDialogProvider, useClass: NativeDialogProvider },
        { provide: AbstractAuthProvider, useClass: AuthProvider }
    ]
})
export class FrameworkModule { }
