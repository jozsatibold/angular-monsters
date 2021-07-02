import {Component, Input, OnInit} from '@angular/core';
import {BaseDetails} from '../../../global/models/base.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {BaseService} from '../../../global/services/base.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() pageName: string;
  @Input() setNumber: string;
  @Input() baseService: BaseService<BaseDetails>;
  items$: Observable<BaseDetails[]>;
  refresh$ = new BehaviorSubject(null);

  constructor() { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items$ = this.refresh$
      .pipe(
        switchMap(() => this.baseService.getItems())
      );
  }

  delete(item: BaseDetails): void {
    this.baseService.delete(item.id).subscribe(
      () => this.refresh$.next(true)
    );
  }

}
