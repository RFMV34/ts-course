function animated(constructor: typeof movingElement): typeof movingElement { // Decorator function
  (constructor as typeof movingElement & Function).prototype.animated = true;
  return constructor;
}

class Rotater {
  rotate (elem: HTMLElement) {
    elem.style.transform = "rotate(-315deg)"
  }
  rotateBack (elem: HTMLElement) {
    elem.style.transform = ""
  }
}

class Mover {
  move (elem: HTMLElement) {
    elem.style.transform = "translateX(50px)"
  }
  moveBack (elem: HTMLElement) {
    elem.style.transform = ""
  }
}

@animated
class movingElement implements Rotater, Mover {
  rotate: (elem: HTMLElement) => any;
  move: (elem: HTMLElement) => any;
  moveBack: (elem: HTMLElement) => any;
  rotateBack: (elem: HTMLElement) => any;
  element: HTMLElement;
  animated: false;

  constructor(elem: HTMLElement) {
    elem.onmousedown = () => {
      this.move(elem);
    };
    elem.onmouseup = () => {
      this.moveBack(elem);
    };
    elem.onmouseover = () => {
      this.rotate(elem);
    };
    elem.onmouseout = () => {
      this.rotateBack(elem);
    };
    if (this.animated) {
      elem.style.transition = "transform .5s ease"
    }
    this.element = elem;
  }
}

function applyMixins(derivedClass: any, baseClasses: any[]) { // MIXIN function
  baseClasses.forEach(baseClass => {
    Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
      derivedClass.prototype[name] = baseClass.prototype[name];
    });
  });
}

applyMixins(movingElement, [Mover, Rotater]);

class genericClass<T> {
  val : T;
  setVal(val : T) {
    this.val = val;
  }
  getVal() : T {
    return this.val;
  }
}

let element1 = new genericClass<Element>();
let element2 = new genericClass<HTMLElement>();
let element3 = new genericClass<Element>();

element1.setVal(document.createElement('div'));
element2.setVal(document.createElement('div'));
element3.setVal(document.createElement('div'));

let elementArray = [
  element1.getVal(),
  element2.getVal(),
  element3.getVal(),
];

function isHTMLElement(x: any): x is HTMLElement { // note IS keyword here!!!
  return x.style !== undefined;
}

function convertElement(elem : Element | HTMLElement): HTMLElement {
  if (!isHTMLElement(elem)) {
    return <HTMLElement>elem;
  }
  else {
    return elem;
  }
}

function standardizeElements(elemArray: Array<any>) : Array<HTMLElement> {
  for (let elem of elemArray) {
    convertElement(elem)
  }
  return elemArray;
}

let standardElements = standardizeElements(elementArray);

for (let elem of standardElements) {
  elem.style.width = "60px"
  elem.style.height = "60px"
  elem.style.backgroundColor = "green";
  elem.style.margin = "5px";
  let elemClass = new movingElement(elem);
  document.body.appendChild(elemClass.element);
}
