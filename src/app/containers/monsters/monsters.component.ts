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

  delete(monster: Monster): void {
    this.monsterService.deleteMonster(monster.id).subscribe(
        () => this.refresh$.next(true)
    );
  }
}
