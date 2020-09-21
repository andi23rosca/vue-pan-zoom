export default class Point {
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
  clamp(min: Point, max: Point) {
    return new Point(
      Math.min(Math.max(this.x, min.x), max.x),
      Math.min(Math.max(this.y, min.y), max.y)
    );
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
