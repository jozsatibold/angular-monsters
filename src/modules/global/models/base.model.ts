import {LocationsEnum} from '../enums/locations.enum';

export abstract class BaseDetails {
  id: number;
  name: string;
  popularity: number;
  weight: number;
  height: number;
  affinity: number; // -1 water, 0 land, 1 air
  xp: number;

  abstract getPower(): number;

  calculatePower(place: LocationsEnum): number {
    switch (place){
      case LocationsEnum.water:
          return this.getPower() * (1 + this.affinity * -1);
      case LocationsEnum.air:
          return this.getPower() * (1 + this.affinity);
      default:
          if (this.affinity >= 0){
            return this.getPower() * ((0.5 - this.affinity) * 2 + 1);
          }

          return this.getPower() * ((0.5 - (this.affinity * -1)) * 2 + 1);
    }
  }

  fight(entity: BaseDetails, place: LocationsEnum): number {
    let entityPower = entity.calculatePower(place);
    let selfPower = this.calculatePower(place);
    const luckyFactor = Math.random();

    if (luckyFactor >= 0.5) {
      selfPower *= (1 + luckyFactor);
    } else {
      entityPower *= (1 + luckyFactor);
    }

    if (selfPower >= entityPower) {
      return 1 - (1 - (1 / selfPower));
    }

    return 1 - (1 / selfPower);
  }
}

