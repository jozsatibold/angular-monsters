import {Store} from '@ngrx/store';
import {globalSelectors} from '../+states/global.selectors';
import {filter, tap} from 'rxjs/operators';
import {loadRobots, refreshMonsters, refreshRobots} from '../+states/global.actions';
import {Injectable} from '@angular/core';
import {GlobalSandbox} from './global.sandbox';
import {Robot} from '../models/robot.model';
import {Observable} from 'rxjs';
import {RobotService} from '../services/robot.service';

@Injectable({providedIn: 'root'})
export class RobotSandbox extends GlobalSandbox<Robot>{
  constructor(private store: Store,
              private robotService: RobotService) {
    super();
  }

  delete(id: number): Observable<Robot> {
    return this.robotService.delete(id).pipe(
      tap(() => this.refreshItems())
    );
  }

  refreshItems() {
    this.store.dispatch(refreshRobots());
  }

  getItems(): Observable<Robot[]>{
    return this.store.select(globalSelectors.getRobots)
      .pipe(
        filter(value => {
          if (value === null){
            this.store.dispatch(loadRobots());
            return false;
          }
          return true;
        })
      );
  }

  add(value: Robot): Observable<Robot> {
    return this.robotService.add(value).pipe(
      tap(() => this.refreshItems())
    );
  }

}
