import {BaseDetails} from './base.model';

export class Robot extends BaseDetails {
  efficiency: number;

  getPower(): number {
    return this.efficiency * this.height * this.xp;
  }
}
