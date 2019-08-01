import {DiceRoller} from './dice-roller.js';
import * as _ from 'lodash';
import {DiceHtmlElement} from "./dice.js";

function applyMixins(derivedClass: any, baseClasses: any[]) { // MIXIN function
  baseClasses.forEach(baseClass => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
      derivedClass.prototype[name] = baseClass.prototype[name];
    });
  });
}

applyMixins(DiceRoller, [DiceHtmlElement]);

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
