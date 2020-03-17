export default class Point {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  add(p: Point) {
    return new Point(this.x + p.x, this.y + p.y);
  }
  subtract(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }
  clone() {
    return new Point(this.x, this.y);
  }
  distanceTo(p: Point) {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }
  centerTo(p: Point) {
    return new Point((this.x + p.x) / 2, (this.y + p.y) / 2);
  }
}
