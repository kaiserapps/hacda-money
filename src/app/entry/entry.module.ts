import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap/tooltip/tooltip.module';

import { FrameworkModule } from '../framework/framework.module';
import { AuthGuard } from '../framework/guards/auth.guard';
import { AttendanceBalanceComponent } from './components/attendance-balance/attendance-balance.component';
import { AttendanceCounterComponent } from './components/attendance-counter/attendance-counter.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { BalanceCountComponent } from './components/balance-count/balance-count.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ChecksReceivedComponent } from './components/checks-received/checks-received.component';
import { FormOverviewComponent } from './components/form-overview/form-overview.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { FreeEntriesComponent } from './components/free-entries/free-entries.component';
import { HeaderComponent } from './components/header/header.component';
import { PerformerComponent } from './components/performer/performer.component';
import { PerformersComponent } from './components/performers/performers.component';
import { SubmissionErrorComponent } from './components/submission-error/submission-error.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { EntryRouting } from './entry.routing';
import { AbstractFormService } from './services/abstract-form.service';
import { FormService } from './services/form.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FrameworkModule,
        EntryRouting
    ],
    declarations: [
        FormSearchComponent,
        FormOverviewComponent,
        AttendanceComponent,
        PerformersComponent,
        AttendanceCounterComponent,
        PerformerComponent,
        HeaderComponent,
        FreeEntriesComponent,
        ChecksReceivedComponent,
        BalanceComponent,
        SubmissionComponent,
        BalanceCountComponent,
        SubmissionErrorComponent,
        AttendanceBalanceComponent
    ],
    providers: [
        NgbTooltipConfig,
        AuthGuard,
        { provide: AbstractFormService, useClass: FormService }
    ]
})
export class EntryModule { }
