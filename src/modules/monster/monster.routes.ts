import {Routes} from '@angular/router';
import {MonsterDashboardComponent} from './containers/monster-dashboard/monster-dashboard.component';
import {MonsterDetailComponent} from './containers/monster-detail/monster-detail.component';
import {MonstersComponent} from './containers/monsters/monsters.component';
import {AddMonsterComponent} from './containers/add-monster/add-monster.component';

export const monsterRoutes: Routes = [
  { path: '', component: MonsterDashboardComponent },
  { path: 'list', component: MonstersComponent },
  { path: 'add', component: AddMonsterComponent },
  { path: ':id', component: MonsterDetailComponent }
];
