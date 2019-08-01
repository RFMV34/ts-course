import {DiceRoller} from './dice-roller.js';
import * as _ from 'lodash';

function createDices(): Array<DiceRoller> {
  return [new DiceRoller(), new DiceRoller(50, 2, false), new DiceRoller()];
}

const diceArray = createDices();

const rollButton = document.createElement('button');
rollButton.innerText = 'Roll the Dice';
rollButton.onclick = () => {
  _.forEach(diceArray, dice => dice.roll());
};
document.body.appendChild(rollButton);
