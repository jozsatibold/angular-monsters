import {BaseDetails} from './base.model';

export class Monster extends BaseDetails {
  bodyIndex: number;

  constructor(bodyIndex: number, id: number, name: string,
              popularity: number, weight: number, height: number, affinity: number, xp: number) {
    super(id, name, popularity, weight, height, affinity, xp);
    this.bodyIndex = bodyIndex;
  }

  getPower(): number {
    return this.bodyIndex * this.height * this.xp;
  }
}
