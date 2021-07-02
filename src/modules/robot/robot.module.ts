import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {robotRoutes} from './robot.routes';
import {AddRobotComponent} from './containers/add-robot/add-robot.component';
import {RobotDashboardComponent} from './containers/robot-dashboard/robot-dashboard.component';
import {RobotDetailComponent} from './containers/robot-detail/robot-detail.component';
import {RobotsComponent} from './containers/robots/robots.component';

@NgModule({
  declarations: [
    AddRobotComponent,
    RobotDashboardComponent,
    RobotDetailComponent,
    RobotsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(robotRoutes)
  ]
})
export class RobotModule { }
