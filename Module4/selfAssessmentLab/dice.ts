import {DiceSide} from './dice-side.enum.js';
import {DiceColor} from './dice-color.enum.js';
import {DisplayProps} from "./display-props.js";

export class DiceHtmlElement {
  setDisplayProps(element: HTMLElement): void {
    element.style.display = DisplayProps.display;
    element.style.justifyContent = DisplayProps.align;
    element.style.alignItems = DisplayProps.align;
  }

  setSize(element: HTMLElement, size: number | string): void {
    if (typeof size === 'number') {
      element.style.width = `${String(size)}px`;
      element.style.height = `${String(size)}px`;
    } else {
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
    }
  }

  setColorStyle(element: HTMLElement, borderWidth: number, type: DiceSide, bold: boolean): void {
    element.style.color = DiceColor[type];
    element.style.border = `${borderWidth}px solid ${DiceColor[type]}`;
    element.style.fontWeight = bold ? 'bold' : '';
  }
}

export class Dice implements DiceHtmlElement {

  private element: HTMLElement;
  private _type = DiceSide.Elf;

  get type(): DiceSide {
    return this._type;
  }

  set type(value: DiceSide) {
    this._type = value;
    this.element.innerText = DiceSide[this.type];
    this.setColorStyle(this.element, this.borderWidth, this.type, true);
  }

  setDisplayProps: (element: HTMLElement) => void;
  setSize: (element: HTMLElement, size: number | string) => void;
  setColorStyle: (element: HTMLElement, borderWidth: number, type: DiceSide, bold: boolean) => void;

  constructor(private size = 100,
              private borderWidth = 5,
              private bold = true) {
    this.createHTMLElement();
    this.element.innerText = DiceSide[this.type];
    this.setDisplayProps(this.element);
    this.setSize(this.element, this.size);
    this.setColorStyle(this.element, this.borderWidth, this.type, true);
  }

  private createHTMLElement(): void {
    this.element = document.createElement('div') as HTMLElement;
    document.body.appendChild(this.element);
  }

}
