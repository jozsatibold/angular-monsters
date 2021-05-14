import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  monsters$: Observable<Monster[]>;

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.getMonsters();
  }

  getMonsters(): void {
      this.monsters$ = this.monsterService.getMonsters('popularity', 'desc', 1, 4);
  }
}
