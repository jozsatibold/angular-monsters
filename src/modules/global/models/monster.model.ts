import {BaseDetails} from './base.model';

export class Monster extends BaseDetails {
  bodyIndex: number;

  getPower(): number {
    return this.bodyIndex * this.height * this.xp;
  }
}
