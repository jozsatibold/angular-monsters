import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {BaseService} from '../../../global/services/base.service';
import {BaseDetails} from '../../../global/models/base.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() searchName: string;
  @Input() baseService: BaseService<BaseDetails>;
  items$: Observable<BaseDetails[]>;
  searchControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.items$ = this.searchControl.valueChanges.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      filter(search => search.length > 2),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.baseService.search(term)),
    );

  }

}
