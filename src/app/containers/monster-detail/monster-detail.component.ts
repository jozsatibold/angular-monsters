import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: [ './monster-detail.component.css' ]
})
export class MonsterDetailComponent implements OnInit {
  monster: Monster;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMonster();
  }

  getMonster(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.monsterService.getMonster(id)
      .subscribe(monster => this.monster = monster);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.monsterService.updateMonster(this.monster)
      .subscribe(() => this.goBack());
  }
}
