import {Component, Input} from '@angular/core';
import {BaseDetails} from '../../../global/models/base.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent {
  @Input() items: Array<BaseDetails> = [];
  @Input() route = '';

}
