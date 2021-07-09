import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GlobalState} from './global.reducer';

const getGlobalState = createFeatureSelector<GlobalState>('global');
const getRobots = createSelector(getGlobalState, state => state.robots);
const getMonsters = createSelector(getGlobalState, state => state.monsters);

export const globalSelectors = {
  getRobots,
  getMonsters
};
