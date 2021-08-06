import {Store} from '@ngrx/store';
import {globalSelectors} from '../+states/global.selectors';
import {filter, tap} from 'rxjs/operators';
import {loadMonsters, refreshMonsters} from '../+states/global.actions';
import {Injectable} from '@angular/core';
import {GlobalSandbox} from './global.sandbox';
import {Monster} from '../models/monster.model';
import {Observable} from 'rxjs';
import {MonsterService} from '../services/monster.service';

@Injectable({providedIn: 'root'})
export class MonsterSandbox extends GlobalSandbox<Monster> {
  constructor(private store: Store,
              private monsterService: MonsterService) {
    super();
  }

  delete(id: number): Observable<Monster> {
    return this.monsterService.delete(id).pipe(
      tap(() => this.refreshItems())
    );
  }

  refreshItems() {
    this.store.dispatch(refreshMonsters());
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

  add(value: Monster): Observable<Monster> {
    return this.monsterService.add(value).pipe(
      tap(() => this.refreshItems())
    );
  }

}
