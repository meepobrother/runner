import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { StartupService } from '@core/startup/startup.service';
// angular i18n
import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);
// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module';
import { environment } from '../environments/environment';
import { RouterModule, UrlSerializer } from '@angular/router';
import { MeepoUrlSerializer } from 'we7-router';
import { DelonModule } from '@core/delon.module';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(environment),
        DelonModule.forRoot(),
        RouterModule.forRoot([{
            path: `web/site/entry/${environment.m}`,
            loadChildren: 'app/routes/routes.module#RoutesModule'
        }]),
        SharedModule,
        JsonSchemaModule
    ],
    providers: [
        { provide: UrlSerializer, useClass: MeepoUrlSerializer },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
