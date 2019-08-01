let color: string = "green";
let squareSizeNum: number = 100;
let squareSize: string = `${ squareSizeNum }px`;
let colorChange: Function = (elem: Element, color: string) : boolean => {
  (elem as HTMLElement).style.backgroundColor = color;
  return true;
};


let div: Element = document.createElement('div');
(div as HTMLElement).style.width = squareSize;
(div as HTMLElement).style.height = squareSize;

let button: Element = document.createElement('button');
(button as HTMLElement).onclick = (event) => {
  colorChange(div, color);
};

button.textContent = "Change Color";
document.body.appendChild(button);
document.body.appendChild(div);
