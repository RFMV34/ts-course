import {DiceSide} from './dice-side.enum.js';
import {Dice} from './dice.js';

declare namespace chance {
  export interface Base {
    integer: Function
  }
}
declare var chance: chance.Base;

interface IDiceRoller {
  roll(): void;
}

export class DiceRoller extends Dice implements IDiceRoller{

  roll(): void {
    const randomNum = Math.floor(chance.integer({ min: 0, max: (Object.keys(DiceSide).length / 2) - 1}));
    this.type = DiceSide[DiceSide[randomNum]];
  }

}
