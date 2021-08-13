import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BaseService} from './base.service';
import {Robot} from '../models/robot.model';

@Injectable({ providedIn: 'root' })
export class RobotService extends BaseService<Robot> {

  convertObject(item): Robot {
    return new Robot(item.efficiency, item.id, item.name, item.popularity, item.weight, item.height, item.affinity, item.xp);
  }

  constructor(
    private RobotHttp: HttpClient) {
    super(RobotHttp, '/robots');
  }
}
