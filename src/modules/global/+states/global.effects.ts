import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {RobotService} from '../services/robot.service';
import {MonsterService} from '../services/monster.service';
import {loadRobots, setMonsters, setRobots} from './global.actions';
import {map, switchMap} from 'rxjs/operators';


@Injectable()
export class GlobalEffects {

  constructor(private actions$: Actions, private robotService: RobotService, private monsterService: MonsterService) {
  }

  LoadRobotsEffect = createEffect(() => this.actions$
    .pipe(
      ofType('[Robots] Load'),
      switchMap(() => this.robotService.getItems()),
      map(robots => setRobots({robots}))
    ));

  LoadMonstersEffect = createEffect(() => this.actions$
    .pipe(
      ofType('[Monsters] Load'),
      switchMap(() => this.monsterService.getItems()),
      map(monsters => setMonsters({monsters}))
    ));

}

