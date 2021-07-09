import { Component } from '@angular/core';
import {RobotSandbox} from '../../../global/sandboxes/robot.sandbox';

@Component({
  selector: 'app-robot',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.css']
})
export class RobotsComponent {
  constructor(public robotSandbox: RobotSandbox) { }
}
