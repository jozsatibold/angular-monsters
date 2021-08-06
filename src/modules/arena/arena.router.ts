import {Routes} from '@angular/router';
import {SelectorContainersComponent} from './containers/selector/selector.containers';
import {WarZoneContainers} from './containers/warzone/war-zone.containers';

export const arenaRoutes: Routes = [
  { path: '', component: SelectorContainersComponent },
  { path: 'war-zone', component: WarZoneContainers },
  { path: '**', redirectTo: '' },
];
