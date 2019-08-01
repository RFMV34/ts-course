enum DiceSide {
  Elf,
  Orc,
  Human,
  Undead
}

enum DiceColor {
  green,
  red,
  blue,
  black
}

interface IDice {
  type: DiceSide;
}

interface IDiceRoller {
  roll(): void;
}

class Dice implements IDice {

  private element: HTMLElement;
  private _type = DiceSide.Elf;

  get type(): DiceSide {
    return this._type;
  }

  set type(value: DiceSide) {
    this._type = value;
    this.element.innerText = DiceSide[this.type];
    this.setColorStyle();
  }

  constructor(private size = 100,
              private borderWidth = 5,
              private bold = true) {
    this.createHTMLElement();
    this.element.innerText = DiceSide[this.type];
    this.setDisplayProps();
    this.setSize();
    this.setColorStyle();
  }

  private createHTMLElement(): void {
    this.element = document.createElement('div') as HTMLElement;
    document.body.appendChild(this.element);
  }

  private setDisplayProps(): void {
    this.element.style.display = 'flex';
    this.element.style.justifyContent = 'center';
    this.element.style.alignItems = 'center';
  }

  private setSize(): void {
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
  }

  private setColorStyle(): void {
    this.element.style.color = DiceColor[this.type];
    this.element.style.border = `${this.borderWidth}px solid ${DiceColor[this.type]}`;
    this.element.style.fontWeight = this.bold ? 'bold' : '';
  }

}

class DiceRoller extends Dice implements IDiceRoller{

  roll(): void {
    const randomNum = Math.floor(Math.random() * Object.keys(DiceSide).length / 2);
    this.type = DiceSide[DiceSide[randomNum]];
  }

}

function createDices(): Array<DiceRoller> {
  return [new DiceRoller(), new DiceRoller(50, 2, false), new DiceRoller()];
}

const diceArray = createDices();

const rollButton = document.createElement('button');
rollButton.innerText = 'Roll the Dice';
rollButton.onclick = () => {
  diceArray.forEach(dice => dice.roll());
};
document.body.appendChild(rollButton);
