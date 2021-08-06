import {createAction, props} from '@ngrx/store';
import {Robot} from '../models/robot.model';
import {Monster} from '../models/monster.model';

export const loadRobots = createAction('[Robots] Load');
export const refreshRobots = createAction('[Robots] Refresh');
export const setRobots = createAction('[Robots] Set', props<{robots: Robot[]}>());
export const loadMonsters = createAction('[Monsters] Load');
export const refreshMonsters = createAction('[Monsters] Refresh');
export const setMonsters = createAction('[Monsters] Set', props<{monsters: Monster[]}>());



