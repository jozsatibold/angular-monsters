import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {RobotService} from '../../../global/services/robot.service';
import {Robot} from '../../../global/models/robot.model';

@Component({
  selector: 'app-robot-dashboard',
  templateUrl: './robot-dashboard.component.html',
  styleUrls: [ './robot-dashboard.component.css' ]
})
export class RobotDashboardComponent implements OnInit {
  robots$: Observable<Robot[]>;

  constructor(public robotService: RobotService) { }

  ngOnInit() {
    this.getRobots();
  }

  getRobots(): void {
      this.robots$ = this.robotService.getItems('popularity', 'desc', 1, 4);
  }
}
