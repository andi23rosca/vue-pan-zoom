import Point from "./Point";

/* eslint-disable */
const touchPoint = (e: TouchEvent, finger: number) =>
  new Point(e.touches[finger].clientX, e.touches[finger].clientY);

export default function panZoom(
  container: HTMLElement,
  content: HTMLElement,
  minZoom: number,
  maxZoom: number,
  cb: (tr: string) => any
) {
  let panning = false;
  let zooming = false;

  let start0 = new Point();
  let end0 = new Point();

  let startDist = 0;
  let endDist = 0;

  let zoom = 1;
  let lastZoom = 1;

  let scaledSize = 0;

  function setTransform(tr: Point, zoom: number) {
    cb(`translate(${tr.x}px, ${tr.y}px) scale(${zoom})`);
  }
  function setZoom(z: number) {
    zoom = z = Math.max(Math.min(z, maxZoom), minZoom);
  }

  function touchMove(e: TouchEvent) {
    if (panning) {
      end0 = touchPoint(e, 0).subtract(start0);
      setTransform(end0, zoom);
    } else if (zooming) {
      const finger0 = touchPoint(e, 0);
      const finger1 = touchPoint(e, 1);
      end0 = finger0.centerTo(finger1).subtract(start0);
      endDist = finger0.distanceTo(finger1) * lastZoom - startDist;
      const hd = endDist + scaledSize;
      setZoom(lastZoom * (hd / scaledSize) ** 4);
      // console.log(endDist, zoom);
      setTransform(end0, zoom);
    }
    e.preventDefault();
  }
  function touchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      panning = true;
      zooming = false;
      start0 = touchPoint(e, 0).subtract(end0);
    } else if (e.touches.length === 2) {
      zooming = true;
      panning = false;
      const finger0 = touchPoint(e, 0);
      const finger1 = touchPoint(e, 1);
      start0 = finger0.centerTo(finger1).subtract(end0);
      lastZoom = zoom;
      scaledSize =
        Math.hypot(content.offsetWidth, content.offsetHeight) * lastZoom;
      startDist = finger0.distanceTo(finger1) * lastZoom;
    }
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("touchend", touchEnd);
    e.preventDefault();
  }
  function touchEnd(e: TouchEvent) {
    zooming = false;
    if (e.touches.length === 1) {
      panning = true;
      start0 = touchPoint(e, 0).subtract(end0);
    } else {
      panning = false;
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
    }
    e.preventDefault();
  }

  container.addEventListener("touchstart", touchStart);
}
