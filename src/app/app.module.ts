import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UrlInterceptor } from './interceptors/url.interceptor';
import {SharedModule} from '../modules/shared/shared.module';
import {GlobalModule} from '../modules/global/global.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GlobalModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }
  ]
})
export class AppModule { }
