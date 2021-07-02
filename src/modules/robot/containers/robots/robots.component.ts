import { Component } from '@angular/core';
import {RobotService} from '../../../global/services/robot.service';

@Component({
  selector: 'app-robot',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent {
  constructor(public robotService: RobotService) { }
}
