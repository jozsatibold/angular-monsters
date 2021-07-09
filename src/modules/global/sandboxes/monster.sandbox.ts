import {Store} from '@ngrx/store';
import {globalSelectors} from '../+states/global.selectors';
import {filter} from 'rxjs/operators';
import {loadMonsters} from '../+states/global.actions';
import {Injectable} from '@angular/core';
import {GlobalSandbox} from './global.sandbox';
import {Monster} from '../models/monster.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MonsterSandbox extends GlobalSandbox<Monster> {
  constructor(private store: Store) {
    super();
  }

  getItems(): Observable<Monster[]>{
    return this.store.select(globalSelectors.getMonsters)
      .pipe(
        filter(value => {
          if (value === null){
            this.store.dispatch(loadMonsters());
            return false;
          }
          return true;
        })
    );
  }
}
