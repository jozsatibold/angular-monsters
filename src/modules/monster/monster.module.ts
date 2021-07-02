import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MonsterDashboardComponent} from './containers/monster-dashboard/monster-dashboard.component';
import {MonstersComponent} from './containers/monsters/monsters.component';
import {MonsterDetailComponent} from './containers/monster-detail/monster-detail.component';
import {AddMonsterComponent} from './containers/add-monster/add-monster.component';
import {RouterModule} from '@angular/router';
import {monsterRoutes} from './monster.routes';

@NgModule({
  declarations: [
    MonsterDashboardComponent,
    MonstersComponent,
    MonsterDetailComponent,
    AddMonsterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(monsterRoutes)
  ]
})
export class MonsterModule {




}
