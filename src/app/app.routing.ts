import { RouterModule } from '@angular/router';

import { ErrorComponent } from './framework/components/error/error.component';

const appRoutes = [
    {
        path: 'error/:code',
        component: ErrorComponent
    },
    {
        path: '**',
        component: ErrorComponent,
        data: { code: 404 }
    }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
