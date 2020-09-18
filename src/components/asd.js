let panning = false;
let zooming = false;
let startX0;
let startY0;
let startX1;
let startY1;
let endX0;
let endY0;
let endX1;
let endY1;
let startDistanceBetweenFingers;
let endDistanceBetweenFingers;
let pinchRatio;
const imgWidth = 200;
const imgHeight = 300;
let currentContinuousZoom = 1.0;
let currentOffsetX = -100;
let currentOffsetY = -100;
let currentWidth = imgWidth;
let currentHeight = imgHeight;
let newContinuousZoom;
let newHeight;
let newWidth;
let newOffsetX;
let newOffsetY;
let centerPointStartX;
let centerPointStartY;
let centerPointEndX;
let centerPointEndY;
let translateFromZoomingX;
let translateFromZoomingY;
let translateFromTranslatingX;
let translateFromTranslatingY;
let translateTotalX;
let translateTotalY;
let percentageOfImageAtPinchPointX;
let percentageOfImageAtPinchPointY;
let theImage;

function touchStart(event) {
  panning = false;
  zooming = false;
  if (event.touches.length == 1) {
    panning = true;
    startX0 = event.touches[0].pageX;
    startY0 = event.touches[0].pageY;
  }
  if (event.touches.length == 2) {
    zooming = true;
    startX0 = event.touches[0].pageX;
    startY0 = event.touches[0].pageY;
    startX1 = event.touches[1].pageX;
    startY1 = event.touches[1].pageY;
    centerPointStartX = (startX0 + startX1) / 2.0;
    centerPointStartY = (startY0 + startY1) / 2.0;
    percentageOfImageAtPinchPointX =
      (centerPointStartX - currentOffsetX) / currentWidth;
    percentageOfImageAtPinchPointY =
      (centerPointStartY - currentOffsetY) / currentHeight;
    startDistanceBetweenFingers = Math.sqrt(
      Math.pow(startX1 - startX0, 2) + Math.pow(startY1 - startY0, 2)
    );
  }
}
function touchMove(event) {
  // This keeps touch events from moving the entire window.
  // event.preventDefault();
  if (panning) {
    endX0 = event.touches[0].pageX;
    endY0 = event.touches[0].pageY;
    translateFromTranslatingX = endX0 - startX0;
    translateFromTranslatingY = endY0 - startY0;
    newOffsetX = currentOffsetX + translateFromTranslatingX;
    newOffsetY = currentOffsetY + translateFromTranslatingY;
    theImage.style.left = newOffsetX + "px";
    theImage.style.top = newOffsetY + "px";
  } else if (zooming) {
    // Get the new touches
    endX0 = event.touches[0].pageX;
    endY0 = event.touches[0].pageY;
    endX1 = event.touches[1].pageX;
    endY1 = event.touches[1].pageY;
    // Calculate current distance between points to get new-to-old pinch ratio and calc width and height
    endDistanceBetweenFingers = Math.sqrt(
      Math.pow(endX1 - endX0, 2) + Math.pow(endY1 - endY0, 2)
    );
    pinchRatio = endDistanceBetweenFingers / startDistanceBetweenFingers;
    newContinuousZoom = pinchRatio * currentContinuousZoom;
    newWidth = imgWidth * newContinuousZoom;
    newHeight = imgHeight * newContinuousZoom;
    // Get the point between the two touches, relative to upper-left corner of image
    centerPointEndX = (endX0 + endX1) / 2.0;
    centerPointEndY = (endY0 + endY1) / 2.0;
    // This is the translation due to pinch-zooming
    translateFromZoomingX =
      (currentWidth - newWidth) * percentageOfImageAtPinchPointX;
    translateFromZoomingY =
      (currentHeight - newHeight) * percentageOfImageAtPinchPointY;
    // And this is the translation due to translation of the centerpoint between the two fingers
    translateFromTranslatingX = centerPointEndX - centerPointStartX;
    translateFromTranslatingY = centerPointEndY - centerPointStartY;
    // Total translation is from two components: (1) changing height and width from zooming and (2) from the two fingers translating in unity
    translateTotalX = translateFromZoomingX + translateFromTranslatingX;
    translateTotalY = translateFromZoomingY + translateFromTranslatingY;
    // the new offset is the old/current one plus the total translation component
    newOffsetX = currentOffsetX + translateTotalX;
    newOffsetY = currentOffsetY + translateTotalY;
    // Set the image attributes on the page
    theImage.style.left = newOffsetX + "px";
    theImage.style.top = newOffsetY + "px";
    theImage.width = newWidth;
    theImage.height = newHeight;
  }
}
function touchEnd(event) {
  if (panning) {
    panning = false;
    currentOffsetX = newOffsetX;
    currentOffsetY = newOffsetY;
  } else if (zooming) {
    zooming = false;
    currentOffsetX = newOffsetX;
    currentOffsetY = newOffsetY;
    currentWidth = newWidth;
    currentHeight = newHeight;
    currentContinuousZoom = newContinuousZoom;
  }
}
function touchCancel(event) {
  alert("cancel fired!");
  if (panning) {
    panning = false;
  } else if (zooming) {
    zooming = false;
  }
}
window.PhoneGapAndjQueryReady = function() {
  theImage = document.getElementById("eiffelTower");
  theImage.height = imgHeight;
  theImage.width = imgWidth;
  theImage.style.left = currentOffsetX + "px";
  theImage.style.top = currentOffsetY + "px";
  theImage.addEventListener("touchstart", touchStart);
  theImage.addEventListener("touchmove", touchMove);
  theImage.addEventListener("touchend", touchEnd);
  theImage.addEventListener("touchcancel", touchCancel);
};
