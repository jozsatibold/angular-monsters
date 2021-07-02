import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Monster } from '../models/monster.model';
import {BaseService} from './base.service';

@Injectable({ providedIn: 'root' })
export class MonsterService extends BaseService<Monster> {
  constructor(
    private MonsertHttp: HttpClient) {
      super(MonsertHttp, '/monsters');
  }
}
