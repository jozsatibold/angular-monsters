import { Component, OnInit } from '@angular/core';
import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  monsters: Monster[] = [];

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.getMonsters();
  }

  getMonsters(): void {
    this.monsterService.getMonsters()
      .subscribe(monsters => this.monsters = monsters.slice(1, 5));
  }
}
