import { Component } from '@angular/core';
import {MonsterSandbox} from '../../../global/sandboxes/monster.sandbox';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent {
  constructor(public monsterSandbox: MonsterSandbox) { }
}
