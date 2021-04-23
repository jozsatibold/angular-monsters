import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subscription, Subject, Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: [ './monster-detail.component.css' ]
})
export class MonsterDetailComponent implements OnInit, OnDestroy {
  monster$: Observable<Monster>;
  formControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMonster();
  }
  
  ngOnDestroy(): void {
  }

  getMonster(): void {
    this.monster$ = this.route.params
        .pipe(
            switchMap( params => this.monsterService.getMonster(+params.id) ), 
            tap(monster => this.formControl.setValue(monster.name))
        );
  }

  goBack(): void {
    this.location.back();
  }

  save(monster): void {
    this.monsterService.updateMonster(monster)
      .subscribe(() => this.goBack());
  }
}
