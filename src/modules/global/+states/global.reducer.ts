import { createReducer, on } from '@ngrx/store';
import {Robot} from '../models/robot.model';
import {Monster} from '../models/monster.model';
import {refreshMonsters, refreshRobots, setMonsters, setRobots} from './global.actions';
export interface GlobalState {
  robots: Robot[];
  monsters: Monster[];
}
export const initialState: GlobalState = {robots: null, monsters: null};

// tslint:disable-next-line:variable-name
const _globalReducer = createReducer(
  initialState,
  on(refreshRobots, (state) => ({...state, robots: null})),
  on(refreshMonsters, (state) => ({...state, monsters: null})),
  on(setRobots, (state, {robots}) => ({...state, robots})),
  on(setMonsters, (state, {monsters}) => ({...state, monsters}))
);

export function globalReducer(state, action) {
  return _globalReducer(state, action);
}
