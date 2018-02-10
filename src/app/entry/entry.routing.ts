import { RouterModule } from '@angular/router';

import { AuthGuard } from '../framework/guards/auth.guard';
import { AttendanceBalanceComponent } from './components/attendance-balance/attendance-balance.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ChecksReceivedComponent } from './components/checks-received/checks-received.component';
import { FormOverviewComponent } from './components/form-overview/form-overview.component';
import { FormSearchComponent } from './components/form-search/form-search.component';
import { FreeEntriesComponent } from './components/free-entries/free-entries.component';
import { HeaderComponent } from './components/header/header.component';
import { PerformersComponent } from './components/performers/performers.component';
import { SubmissionComponent } from './components/submission/submission.component';

const entryRoutes = [
    {
        path: '',
        redirectTo: 'form/search',
        pathMatch: 'full'
    },
    {
        path: 'form',
        redirectTo: 'form/search',
        pathMatch: 'full'
    },
    {
        path: 'form/search',
        component: FormSearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'form/entry/:id',
        component: FormOverviewComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'header',
                pathMatch: 'full'
            },
            {
                path: 'header',
                component: HeaderComponent
            },
            {
                path: 'attendance',
                component: AttendanceComponent
            },
            {
                path: 'attendance-balance',
                component: AttendanceBalanceComponent
            },
            {
                path: 'performers',
                component: PerformersComponent
            },
            {
                path: 'free-entries',
                component: FreeEntriesComponent
            },
            {
                path: 'checks-received',
                component: ChecksReceivedComponent
            },
            {
                path: 'balance',
                component: BalanceComponent
            },
            {
                path: 'submission',
                component: SubmissionComponent
            }
        ]
    }
];

export const EntryRouting = RouterModule.forChild(entryRoutes);
