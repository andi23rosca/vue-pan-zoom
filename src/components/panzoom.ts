interface Point {
  x: number;
  y: number;
}
function getCenter(p1: Point, p2: Point): Point {
  const c: Point = { x: 0, y: 0 };
  c.x = (p1.x + p2.x) / 2;
  c.y = (p1.y + p2.y) / 2;
  return c;
}
function getTouchDistance(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
function getTouch(e: TouchEvent, finger: number): Point {
  return {
    x: e.touches[finger].clientX,
    y: e.touches[finger].clientY
  };
}
const initPoint = (): Point => ({ x: 0, y: 0 });
export default function panzoom(
  container: HTMLElement,
  content: HTMLElement,
  setTransform: (tx: number, ty: number, s: number) => void
) {
  let panning = false;
  let pinching = false;

  let start0 = initPoint();
  let start1 = initPoint();

  let end0 = initPoint();
  let end1 = initPoint();

  let startCenter = initPoint();
  let endCenter = initPoint();

  let startFingerDistance = 0;
  let endFingerDistance = 0;

  const translateFromPan = initPoint();
  let translateFromZoom = initPoint();

  const currentTranslate = initPoint();
  let newTranslate = initPoint();

  const currentZoom = 1;
  let newZoom = 1;

  function touchMove(e: TouchEvent) {
    if (e.touches.length === 1) {
      if (!panning) {
        panning = true;
        pinching = false;
        start0 = getTouch(e, 0);
      } else {
        end0 = getTouch(e, 0);
        translateFromPan.x = end0.x - start0.x;
        translateFromPan.y = end0.y - start0.y;
        setTransform(
          currentTranslate.x + translateFromPan.x,
          currentTranslate.y + translateFromPan.y,
          currentZoom
        );
      }
    } else if (e.touches.length === 2) {
      if (!pinching) {
        pinching = true;
        panning = false;
        start0 = getTouch(e, 0);
        start1 = getTouch(e, 1);
        startCenter = getCenter(start0, start1);
        startFingerDistance = getTouchDistance(start0, start1);
      } else {
        end0 = getTouch(e, 0);
        end1 = getTouch(e, 1);
        endCenter = getCenter(end0, end1);
        endFingerDistance = getTouchDistance(end0, end1);
        const pinchRatio = endFingerDistance / startFingerDistance;
        newZoom = pinchRatio * currentZoom;

        translateFromZoom = { x: 0, y: 0 };
        newTranslate = initPoint();
      }
    }
  }

  function touchEnd(e: TouchEvent) {
    window.removeEventListener("touchmove", touchMove);
    window.removeEventListener("touchend", touchEnd);
  }
  function touchStart(e: TouchEvent) {
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", touchEnd);
  }

  container.addEventListener("touchstart", touchStart);
}
