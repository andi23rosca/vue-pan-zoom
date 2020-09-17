var PhoneGapReady = false;
var jQueryReady = false;
var panning = false;
var zooming = false;
var startX0;
var startY0;
var startX1;
var startY1;
var endX0;
var endY0;
var endX1;
var endY1;
var startDistanceBetweenFingers;
var endDistanceBetweenFingers;
var pinchRatio;
var imgWidth = 200;
var imgHeight = 300;
var currentContinuousZoom = 1.0;
var currentOffsetX = -100;
var currentOffsetY = -100;
var currentWidth = imgWidth;
var currentHeight = imgHeight;
var newContinuousZoom;
var newHeight;
var newWidth;
var newOffsetX;
var newOffsetY;
var centerPointStartX;
var centerPointStartY;
var centerPointEndX;
var centerPointEndY;
var translateFromZoomingX;
var translateFromZoomingY;
var translateFromTranslatingX;
var translateFromTranslatingY;
var translateTotalX;
var translateTotalY;
var percentageOfImageAtPinchPointX;
var percentageOfImageAtPinchPointY;
var theImage;
function onBodyLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
} /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */ /* When this function is called, PhoneGap has been initialized and is ready to roll */
function onDeviceReady() {
  PhoneGapReady = true;
  if (jQueryReady == true) {
    PhoneGapAndjQueryReady();
  }
}
$(document).bind("mobileinit", function() {
  // jQuery Mobile framework configuration changes
  $.support.cors = true;
  $.mobile.allowCrossDomainPages = true;
  jQueryReady = true;
  if (PhoneGapReady == true) {
    PhoneGapAndjQueryReady();
  }
});
function PhoneGapAndjQueryReady() {
  theImage = document.getElementById("eiffelTower");
  theImage.height = imgHeight;
  theImage.width = imgWidth;
  theImage.style.left = currentOffsetX + "px";
  theImage.style.top = currentOffsetY + "px";
  theImage.ontouchstart = touchStart;
  theImage.ontouchmove = touchMove;
  theImage.ontouchend = touchEnd;
  theImage.ontouchcancel = touchCancel;
}
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
  event.preventDefault();
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
