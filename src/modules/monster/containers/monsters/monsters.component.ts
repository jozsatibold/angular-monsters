import { Component } from '@angular/core';
import {MonsterService} from '../../../global/services/monster.service';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent {
  constructor(public monsterService: MonsterService) { }
}
