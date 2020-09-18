class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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

export default function panzoom(
  container: HTMLElement,
  content: HTMLElement
  // setTransform: (tx: number, ty: number, s: number) => void
) {
  let start = Point.origin();
  let offset = Point.origin();
  let translate = Point.origin();
  let panningTranslation = Point.origin();
  let origin = Point.origin();
  let initialPinchScale = 0;
  let pinchScale = 1;

  const rect = document.createElement("div");
  rect.classList.add("rect");
  content.appendChild(rect);

  function onTouchMove(e: TouchEvent) {
    const finger1 = Point.fromTouchEvent(e, 0)
      .multiplyS(pinchScale)
      .subtract(offset);
    if (e.touches.length === 1) {
      panningTranslation = finger1.subtract(start);
    }
    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1)
        .multiplyS(pinchScale)
        .subtract(offset);
      const center = finger1.centerTo(finger2);
      panningTranslation = center.subtract(start);
      pinchScale = finger1.distanceTo(finger2) / initialPinchScale;
    }

    panningTranslation = panningTranslation.add(translate);
    content.style.transform = `translate(${panningTranslation.x}px, ${panningTranslation.y}px) scale(${pinchScale})`;
  }
  function onTouchEnd(e: TouchEvent) {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }
  function onTouchStart(e: TouchEvent) {
    const cr = content.getBoundingClientRect();
    offset = Point.fromClientRect(cr);

    translate = panningTranslation;

    const finger1 = Point.fromTouchEvent(e, 0)
      .multiplyS(pinchScale)
      .subtract(offset);

    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1)
        .multiplyS(pinchScale)
        .subtract(offset);
      start = finger1.centerTo(finger2);
      initialPinchScale = finger1.distanceTo(finger2) / pinchScale;
    } else {
      start = finger1;
    }
    origin = start;

    // const wh = new Point(cr.width, cr.height);

    content.style.transformOrigin = `${origin.x}px ${origin.y}px`;

    rect.style.top = origin.y + "px";
    rect.style.left = origin.x + "px";

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }

  container.addEventListener("touchstart", onTouchStart);
}
