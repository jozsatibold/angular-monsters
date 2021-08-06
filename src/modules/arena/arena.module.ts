import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectorContainersComponent} from './containers/selector/selector.containers';
import {WarZoneContainers} from './containers/warzone/war-zone.containers';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {arenaRoutes} from './arena.router';

@NgModule({
  declarations: [
    SelectorContainersComponent,
    WarZoneContainers
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(arenaRoutes)
  ]
})
export class ArenaModule { }
