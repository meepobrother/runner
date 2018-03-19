import { NgModule, Optional, SkipSelf, ModuleWithProviders, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { StartupService } from './startup/startup.service';
import { UtilService } from './util.service';
import { ENVIRONMENT } from './token';
export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

// import { SimpleInterceptor } from '@delon/auth';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DefaultInterceptor } from './net/default.interceptor';
import { DelonModule } from './delon.module';
import { AccountsService } from './accounts.service';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    HttpClientModule,
    DelonModule
  ],
  exports: [
    HttpClientModule,
    DelonModule
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(env: any): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        StartupService,
        UtilService,
        AccountsService,
        MessageService,
        {
          provide: APP_INITIALIZER,
          useFactory: StartupServiceFactory,
          multi: true,
          deps: [StartupService]
        },
        {
          provide: ENVIRONMENT,
          useValue: env
        },
        // { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'zh-Hans' }
      ]
    };
  }
}
