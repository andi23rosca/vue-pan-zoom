import Point from "@/helpers/Point";
// function displayPoints(cont: HTMLElement, points: Point[]) {
//   Array.from(cont.children).forEach((c) => {
//     cont.removeChild(c);
//   });
//   points.forEach((p) => {
//     const rect = document.createElement("div");
//     rect.classList.add("rect");
//     cont.appendChild(rect);
//     rect.style.top = p.y + "px";
//     rect.style.left = p.x + "px";
//   });
// }

export default function panzoom(options: {
  content: HTMLElement;
  container: HTMLElement;
}) {
  // const rcont = document.createElement("div");
  // rcont.style.position = "relative";
  // content.prepend(rcont);

  function setTransform(translate: Point, origin: Point, zoom: number) {
    options.content.style.transformOrigin = `${origin.x}px ${origin.y}px`;
    options.content.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`;
  }

  let offset = Point.origin();
  let translate = new Point(0, 0);
  let translating = translate;
  let origin = new Point(0, 0);
  let start = new Point(0, 0);

  let zoom = 1;
  let zooming = zoom;
  let distance = 1;
  let distancing = distance;

  function onTouchMove(e: TouchEvent) {
    const finger1 = Point.fromTouchEvent(e).subtract(offset);
    let mover = finger1;

    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1).subtract(offset);
      const center = finger1.centerTo(finger2);
      mover = center;
      distancing = finger1.distanceTo(finger2);
      zooming = distancing / distance;
    }
    translating = mover.subtract(start).add(translate);

    setTransform(translating, origin, zooming);
  }
  function onTouchEnd() {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
    translate = translating;
    zoom = zooming;
    distance = distancing;
  }
  function onTouchStart(e: TouchEvent) {
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    offset = Point.fromClientRect(options.content.getBoundingClientRect());
    const finger1 = Point.fromTouchEvent(e).subtract(offset);

    if (e.touches.length > 1) {
      const finger2 = Point.fromTouchEvent(e, 1).subtract(offset);
      const center = finger1.centerTo(finger2);
      start = center;
      distance = finger1.distanceTo(finger2) / zoom;
      return;
    } else {
      start = finger1;
    }

    const porigin = origin;
    zooming = zoom;
    distancing = distance;
    origin = start.divideS(zoom);
    translate = translate.subtract(
      origin.subtract(porigin).multiplyS(1 - zoom)
    );
    translating = translate;

    setTransform(translate, origin, zoom);
  }

  setTransform(translate, origin, zoom);
  options.container.addEventListener("touchstart", onTouchStart);
}
