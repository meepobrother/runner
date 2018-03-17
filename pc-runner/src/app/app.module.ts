import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, UrlSerializer } from '@angular/router';
import { AppComponent } from './app.component';
import { WebModule } from './web/web.module';
import { MeepoUrlSerializer } from 'we7-router';
import { environment } from '../environments/environment';
import { We7Service } from './we7.service';
import { OrderService } from './order.service';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: 'web/site/entry/' + environment.module,
      loadChildren: 'app/web/web.module#WebModule'
    }, {
      path: '**',
      loadChildren: 'app/web/web.module#WebModule'
    }]),
    SharedModule
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: MeepoUrlSerializer
  }, We7Service, OrderService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
