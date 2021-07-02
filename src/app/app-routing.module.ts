import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/monster', pathMatch: 'full' },
  { path: 'monster',  loadChildren: () => import('../modules/monster/monster.module').then(m => m.MonsterModule) },
  { path: 'robot',  loadChildren: () => import('../modules/robot/robot.module').then(m => m.RobotModule) },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
