import {DiceSide} from './dice-side.enum.js';
import {DiceColor} from './dice-color.enum.js';
import {DisplayProps} from "./display-props.js";

export interface IDice {
  type: DiceSide;
}

export class Dice implements IDice {

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
    this.element.style.display = DisplayProps.display;
    this.element.style.justifyContent = DisplayProps.align;
    this.element.style.alignItems = DisplayProps.align;
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
