import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Monster} from '../../../global/models/monster.model';
import {MonsterService} from '../../../global/services/monster.service';
@Component({
  selector: 'app-monster-dashboard',
  templateUrl: './monster-dashboard.component.html',
  styleUrls: [ './monster-dashboard.component.css' ]
})
export class MonsterDashboardComponent implements OnInit {
  monsters$: Observable<Monster[]>;

  constructor(public monsterService: MonsterService) { }

  ngOnInit() {
    this.getMonsters();
  }

  getMonsters(): void {
      this.monsters$ = this.monsterService.getItems('popularity', 'desc', 1, 4);
  }
}
