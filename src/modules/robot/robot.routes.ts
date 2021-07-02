import {Routes} from '@angular/router';
import {RobotDashboardComponent} from './containers/robot-dashboard/robot-dashboard.component';
import {RobotDetailComponent} from './containers/robot-detail/robot-detail.component';
import {RobotsComponent} from './containers/robots/robots.component';
import {AddRobotComponent} from './containers/add-robot/add-robot.component';

export const robotRoutes: Routes = [
  { path: '', component: RobotDashboardComponent },
  { path: 'list', component: RobotsComponent },
  { path: 'add', component: AddRobotComponent },
  { path: ':id', component: RobotDetailComponent }
];
