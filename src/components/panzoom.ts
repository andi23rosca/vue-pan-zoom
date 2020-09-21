class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }
  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }
  subtract(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }
  multiply(p: Point) {
    return new Point(this.x * p.x, this.y * p.y);
  }
  divide(p: Point) {
    return new Point(this.x / p.x, this.y / p.y);
  }
  addS(n: number) {
    return new Point(this.x + n, this.y + n);
  }
  subtractS(n: number) {
    return new Point(this.x - n, this.y - n);
  }
  multiplyS(n: number) {
    return new Point(this.x * n, this.y * n);
  }
  divideS(n: number) {
    return new Point(this.x / n, this.y / n);
  }
  centerTo(p: Point) {
    return this.add(p).divide(new Point(2, 2));
  }
  distanceTo(p: Point) {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }
  static origin() {
    return new Point(0, 0);
  }
  static fromTouchEvent(e: TouchEvent, finger = 0) {
    return new Point(e.touches[finger].clientX, e.touches[finger].clientY);
  }
  static fromMouseEvent(e: MouseEvent) {
    return new Point(e.clientX, e.clientY);
  }
  static fromClientRect(r: ClientRect) {
    return new Point(r.left, r.top);
  }
}

function displayPoints(cont: HTMLElement, points: Point[]) {
  Array.from(cont.children).forEach((c) => {
    cont.removeChild(c);
  });
  points.forEach((p) => {
    const rect = document.createElement("div");
    rect.classList.add("rect");
    cont.appendChild(rect);
    rect.style.top = p.y + "px";
    rect.style.left = p.x + "px";
  });
}

export default function panzoom(container: HTMLElement, content: HTMLElement) {
  const rcont = document.createElement("div");
  rcont.style.position = "relative";
  content.prepend(rcont);

  function setTransform(translate: Point, origin: Point, zoom: number) {
    content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
    content.style.transform = `scale(${zoom}) translate(${translate.x}px, ${translate.y}px)`;
  }

  let offset = Point.origin();
  let translate = new Point(100, 100);
  let origin = new Point(50, 50);
  let start = new Point(0, 0);

  const cv = (x: number) => {
    if (x >= 1 && x < 2) return (x % 1) / x;
    if (x >= 2 || x > 0) return -1 / x + 1;
    return 0;
  };

  const zoom = 0.7;
  const initialZoom = zoom;

  function onTouchMove(e: TouchEvent) {
    const finger1 = Point.fromTouchEvent(e)
      .subtract(offset)
      .divideS(zoom);
    let translating!: Point;

    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1)
        .subtract(offset)
        .divideS(zoom);
      const center = finger1.centerTo(finger2);

      translating = center.subtract(start.multiplyS(initialZoom).divideS(zoom));

      displayPoints(rcont, [finger1, finger2, center]);
      return;
    }
    translating = finger1.subtract(start.multiplyS(initialZoom).divideS(zoom));

    setTransform(translating, origin, zoom);

    displayPoints(rcont, [finger1, origin]);
  }
  function onTouchEnd() {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }
  function onTouchStart(e: TouchEvent) {
    // document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    offset = Point.fromClientRect(content.getBoundingClientRect());
    const finger1 = Point.fromTouchEvent(e)
      .subtract(offset)
      .divideS(zoom);

    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1)
        .subtract(offset)
        .divideS(zoom);
      const center = finger1.centerTo(finger2);
      start = center;
      return;
    }

    start = finger1;

    const d = start.subtract(origin).multiplyS(cv(zoom));
    console.log(translate, origin, start, d);
    translate = translate.add(d);
    origin = start;

    setTransform(translate, origin, zoom);
    displayPoints(rcont, [origin, start]);
  }

  displayPoints(rcont, [translate, origin]);
  setTransform(translate, origin, zoom);
  container.addEventListener("touchstart", onTouchStart);
}
