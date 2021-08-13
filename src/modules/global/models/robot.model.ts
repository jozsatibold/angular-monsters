import {BaseDetails} from './base.model';

export class Robot extends BaseDetails {
  efficiency: number;

  constructor(efficiency: number, id: number, name: string,
              popularity: number, weight: number, height: number, affinity: number, xp: number) {
    super(id, name, popularity, weight, height, affinity, xp);
    this.efficiency = efficiency;
  }

  getPower(): number {
    return this.efficiency * this.height * this.xp;
  }
}
