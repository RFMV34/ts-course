import {DiceSide} from './dice-side.enum.js';
import {Dice} from './dice.js';

declare namespace chance {
  export interface Base {
    integer: Function
  }
}
declare var chance: chance.Base;

function random(constructor: typeof DiceRoller): typeof DiceRoller {
  /*(constructor as typeof DiceRoller & Function).prototype.randomNum =
    () => Math.floor(chance.integer({ min: 0, max: (Object.keys(DiceSide).length / 2) - 1}));*/
  (constructor as typeof DiceRoller & Function).prototype.randomNum =
    async () => await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=10&type=uint8');
  return constructor;
}

interface IDiceRoller {
  roll(): void;
}

@random
export class DiceRoller extends Dice implements IDiceRoller{

  randomNum: () => number;

  async roll() {
    const length = (await (await this.randomNum() as any).json()).length; // for learning purpose only
    this.type = DiceSide[DiceSide[length / 10]];
  }

}
