import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Monster } from '../models/monster.model';
import {BaseService} from './base.service';

@Injectable({ providedIn: 'root' })
export class MonsterService extends BaseService<Monster> {
  constructor(
    private monsterHttp: HttpClient) {
      super(monsterHttp, '/monsters');
  }

  convertObject(item): Monster {
    return new Monster(item.bodyIndex, item.id, item.name, item.popularity, item.weight, item.height, item.affinity, item.xp);
  }
}
