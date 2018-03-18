import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, UrlSerializer } from '@angular/router';
import { AppComponent } from './app.component';
import { WebModule } from './web/web.module';
import { MeepoUrlSerializer } from 'we7-router';
import { environment } from '../environments/environment';
import { We7Service } from './we7.service';
import { OrderService } from './order.service';
import { LoginService } from './login.service';
import { SharedModule } from './shared/shared.module';
import { We7Module } from './we7/we7.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: `${environment.path}/${environment.c}/${environment.a}/${environment.module}`,
      loadChildren: 'app/web/web.module#WebModule'
    },{
      path: `web/site/entry/${environment.module}`,
      loadChildren: 'app/menu/menu.module#MenuModule'
    }]),
    SharedModule,
    We7Module.forRoot(environment)
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: MeepoUrlSerializer
  }, We7Service, OrderService, LoginService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
