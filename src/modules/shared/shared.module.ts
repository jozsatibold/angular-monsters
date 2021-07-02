import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardComponent,
    SearchComponent,
    ListComponent
  ],
  declarations: [
    DashboardComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
