import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { MonstersComponent } from './containers/monsters/monsters.component';
import { MonsterDetailComponent } from './containers/monster-detail/monster-detail.component';
import { AddMonsterComponent } from './containers/add-monster/add-monster.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'monster/:id', component: MonsterDetailComponent },
  { path: 'monsters', component: MonstersComponent },
  { path: 'add-monster', component: AddMonsterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
