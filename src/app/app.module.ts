import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MonsterDetailComponent } from './containers/monster-detail/monster-detail.component';
import { MonstersComponent } from './containers/monsters/monsters.component';
import { MonsterSearchComponent } from './containers/monster-search/monster-search.component';
import { AddMonsterComponent } from './containers/add-monster/add-monster.component';
import { UrlInterceptor } from './interceptors/url.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MonstersComponent,
    MonsterDetailComponent,
    MonsterSearchComponent,
    AddMonsterComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }
  ]
})
export class AppModule { }
