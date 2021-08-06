import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RobotService} from '../services/robot.service';
import {MonsterService} from '../services/monster.service';
import {loadMonsters, loadRobots, refreshMonsters, refreshRobots, setMonsters, setRobots} from './global.actions';
import {map, switchMap} from 'rxjs/operators';


@Injectable()
export class GlobalEffects {

  constructor(private actions$: Actions, private robotService: RobotService, private monsterService: MonsterService) {
  }

  LoadRobotsEffect = createEffect(() => this.actions$
    .pipe(
      ofType(loadRobots.type),
      switchMap(() => this.robotService.getItems()),
      map(robots => setRobots({robots}))
    ));

  LoadMonstersEffect = createEffect(() => this.actions$
    .pipe(
      ofType(loadMonsters.type),
      switchMap(() => this.monsterService.getItems()),
      map(monsters => setMonsters({monsters}))
    ));
}

