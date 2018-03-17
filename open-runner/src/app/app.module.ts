import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MeepoUrlSerializer } from 'we7-router';
import { RouterModule, UrlSerializer } from '@angular/router';
import { We7Service } from './we7.service';
import { HttpClientModule } from '@angular/common/http';
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
    }]),
    HttpClientModule
  ],
  providers: [{
    provide: UrlSerializer,
    useClass: MeepoUrlSerializer
  }, We7Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
