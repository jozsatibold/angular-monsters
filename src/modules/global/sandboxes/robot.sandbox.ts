import {Store} from '@ngrx/store';
import {globalSelectors} from '../+states/global.selectors';
import {filter} from 'rxjs/operators';
import {loadRobots} from '../+states/global.actions';
import {Injectable} from '@angular/core';
import {GlobalSandbox} from './global.sandbox';
import {Robot} from '../models/robot.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class RobotSandbox extends GlobalSandbox<Robot>{
  constructor(private store: Store) {
    super();
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
