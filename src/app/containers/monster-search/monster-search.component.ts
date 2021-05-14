import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, filter, switchMap
 } from 'rxjs/operators';

import { Monster } from '../../models/monster';
import { MonsterService } from '../../services/monster.service';

@Component({
  selector: 'app-monster-search',
  templateUrl: './monster-search.component.html',
  styleUrls: [ './monster-search.component.css' ]
})
export class MonsterSearchComponent implements OnInit {
  monsters$: Observable<Monster[]>;
  searchControl = new FormControl('');

  constructor(
    private monsterService: MonsterService
    ) {}

  ngOnInit(): void {
    this.monsters$ = this.searchControl.valueChanges.pipe(
    
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      filter(search => search.length > 2),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.monsterService.searchMonsters(term)),
    );
  }
}
