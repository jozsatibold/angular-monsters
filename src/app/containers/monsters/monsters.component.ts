import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent implements OnInit {
  monsters: Monster[];
  monsters$: Observable<Monster[]>;
  refresh$ = new BehaviorSubject(null);

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.getMonsters();
  }

  getMonsters(): void {
    this.monsters$ = this.refresh$
        .pipe(
            switchMap(() => this.monsterService.getMonsters())
        );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.monsterService.addMonster({ name, bodyIndex: 0, weight: 0, popularity: 0, height: 0 } as Monster)
      .subscribe(monster => {
        this.refresh$.next(true);
      });
  }

  delete(monster: Monster): void {
    this.monsterService.deleteMonster(monster.id).subscribe(
        () => this.refresh$.next(true)
    );
  }

}
