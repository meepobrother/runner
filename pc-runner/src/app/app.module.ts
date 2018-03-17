import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, UrlSerializer } from '@angular/router';
import { AppComponent } from './app.component';
import { WebModule } from './web/web.module';
import { MeepoUrlSerializer } from 'we7-router';
import { environment } from '../environments/environment';
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
    }])
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: MeepoUrlSerializer
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
