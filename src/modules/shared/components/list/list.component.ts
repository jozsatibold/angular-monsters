import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseDetails} from '../../../global/models/base.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {GlobalSandbox} from '../../../global/sandboxes/global.sandbox';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() pageName: string;
  @Input() setNumber: string;
  @Input() globalSandbox: GlobalSandbox<BaseDetails>;
  @Input() editable =  true;
  @Input() selectedItems: Array<number> = [];
  @Output() clickedItem = new EventEmitter<BaseDetails>();
  items$: Observable<BaseDetails[]>;

  constructor() { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items$ = this.globalSandbox.getItems();
  }

  delete(item: BaseDetails): void {
    this.globalSandbox.delete(item.id).subscribe();
  }

  clickedElement(item: BaseDetails) {
    this.clickedItem.emit(item);
  }
}
