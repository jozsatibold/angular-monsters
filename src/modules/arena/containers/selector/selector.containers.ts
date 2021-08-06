import {Component, OnInit} from '@angular/core';
import {MonsterSandbox} from '../../../global/sandboxes/monster.sandbox';
import {RobotSandbox} from '../../../global/sandboxes/robot.sandbox';
import {Observable} from 'rxjs';
import {Monster} from '../../../global/models/monster.model';
import {Robot} from '../../../global/models/robot.model';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.containers.css'],
  templateUrl: './selector.containers.html',
})

export class SelectorContainersComponent implements OnInit{
  public monsters$: Observable<Array<Monster>>;
  public robots$: Observable<Array<Robot>>;

  constructor(
    public monsterSandbox: MonsterSandbox,
    public robotSandbox: RobotSandbox
  ) {
  }

  ngOnInit(): void {
    this.monsters$ = this.monsterSandbox.getItems();
    this.robots$ = this.robotSandbox.getItems();
  }
}
