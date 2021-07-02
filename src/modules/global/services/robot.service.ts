import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BaseService} from './base.service';
import {Robot} from '../models/robot.model';

@Injectable({ providedIn: 'root' })
export class RobotService extends BaseService<Robot> {

  constructor(
    private RobotHttp: HttpClient) {
    super(RobotHttp, '/robots');
  }
}
