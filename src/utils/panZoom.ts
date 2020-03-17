import Point from "./Point";

const touchPoint = (e: TouchEvent, finger: number) =>
  new Point(e.touches[finger].clientX, e.touches[finger].clientY);
const mousePoint = (e: MouseEvent) => new Point(e.clientX, e.clientY);

export default function panZoom(
  container: HTMLElement,
  content: HTMLElement,
  minZoom: number,
  maxZoom: number,
  zoomStep: number
) {
  container.style.cursor = "grab";
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
    content.style.transform = `translate(${tr.x}px, ${tr.y}px) scale(${zoom})`;
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

  function mouseMove(e: MouseEvent) {
    if (panning) {
      end0 = mousePoint(e).subtract(start0);
      setTransform(end0, zoom);
    }
  }
  function mouseUp() {
    container.style.cursor = "grab";
    panning = false;
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
  }
  function mouseDown(e: MouseEvent) {
    panning = true;
    container.style.cursor = "grabbing";
    start0 = mousePoint(e).subtract(end0);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    e.preventDefault();
  }

  function mouseWheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      setZoom(zoom - zoomStep);
    } else if (e.deltaY < 0) {
      setZoom(zoom + zoomStep);
    }
    setTransform(end0, zoom);
    e.preventDefault();
  }

  container.addEventListener("touchstart", touchStart);
  container.addEventListener("mousedown", mouseDown);
  container.addEventListener("wheel", mouseWheel);
}
