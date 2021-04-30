import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subscription, Subject, Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: [ './monster-detail.component.css' ]
})
export class MonsterDetailComponent implements OnInit, OnDestroy {
  monster$: Observable<Monster>;
  form: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMonster();
    
    this.form = this.fb.group({
        id: [{value: '', disabled: true}],
        name: ['', [Validators.required, Validators.minLength(3)]],
        weight: ['', [Validators.required, Validators.min(20), Validators.max(6000)]],
        height: ['', [Validators.required, Validators.min(0.7), Validators.max(20)]]
    });
  }
  
  ngOnDestroy(): void {
  }

  getMonster(): void {
    this.monster$ = this.route.params
        .pipe(
            switchMap( params => this.monsterService.getMonster(+params.id) ), 
            tap(monster => this.form.setValue({
                id: monster.id, 
                name: monster.name,
                weight: monster.weight,
                height: monster.height
            })),
        );
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.form.valid){
        const formValue = this.form.getRawValue();
        const bodyIndex = formValue.weight / Math.pow(formValue.height, 2);
        
        this.monsterService.updateMonster({...formValue, bodyIndex})
          .subscribe(() => this.goBack());
    }
  }
}
