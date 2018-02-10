import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { EntryModule } from './entry/entry.module';
import { FrameworkModule } from './framework/framework.module';

@NgModule({
    imports: [
        BrowserModule,
        FrameworkModule,
        AuthModule,
        AdminModule,
        EntryModule,
        /* always leave last to have the catch all route go to 404 */
        AppRouting
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
