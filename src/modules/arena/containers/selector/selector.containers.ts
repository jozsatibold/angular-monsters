import {Component, OnInit} from '@angular/core';
import {MonsterSandbox} from '../../../global/sandboxes/monster.sandbox';
import {RobotSandbox} from '../../../global/sandboxes/robot.sandbox';
import {Observable} from 'rxjs';
import {Monster} from '../../../global/models/monster.model';
import {Robot} from '../../../global/models/robot.model';
import {BaseDetails} from '../../../global/models/base.model';
import {LocationsEnum} from '../../../global/enums/locations.enum';

@Component({
  selector: 'app-selector',
  styleUrls: ['./selector.containers.css'],
  templateUrl: './selector.containers.html',
})

export class SelectorContainersComponent implements OnInit {
  public monsters$: Observable<Array<Monster>>;
  public robots$: Observable<Array<Robot>>;

  public selectedItems: Array<BaseDetails> = [];
  public selectedMonsters: Array<number> = [];
  public selectedRobots: Array<number> = [];

  public selectedLocation: LocationsEnum;
  public queryParams = {};

  public locations = LocationsEnum;

  constructor(
    public monsterSandbox: MonsterSandbox,
    public robotSandbox: RobotSandbox
  ) {
  }

  ngOnInit(): void {
    this.monsters$ = this.monsterSandbox.getItems();
    this.robots$ = this.robotSandbox.getItems();
  }

  selectedItem(item) {
    const exist = this.selectedItems.find(itemke => typeof itemke === typeof item && itemke.id === item.id);
    if (exist){
      return;
    }

    if (this.selectedItems.length >= 2) {
      this.selectedItems.shift();
    }
    this.selectedItems.push(item);

    this.sortItems();
    this.setParams();
  }

  sortItems() {
    this.selectedRobots = this.selectedItems.filter(
      item => item instanceof Robot
    ).map(
      item => item.id
    );

    this.selectedMonsters = this.selectedItems.filter(
      item => item instanceof Monster
    ).map(
      item => item.id
    );
  }

  selectLocation(location: LocationsEnum) {
    this.selectedLocation = location;
    this.setParams();
  }

  setParams() {
    this.queryParams = {
      ...this.selectedLocation ? {location: this.selectedLocation} : {},
      participants: this.selectedItems.map(
        item => item.id
      )
    };
  }
}
