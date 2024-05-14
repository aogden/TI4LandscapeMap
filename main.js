const originalImage = document.getElementsByTagName("img")[0];
const canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var imageObj = new Image();

originalImage.onload = function() {
    imageObj.src = originalImage.src;
    originalImage.parentElement.replaceChild(canvas, originalImage);
};

imageObj.onload = function() {
  var imgWidth = 2680;
  var imgHeight = 4875;
  var topHalfHeight = 2780;
  var bottomHalfHeight = imgHeight - topHalfHeight;

  canvas.width = imgWidth * 2;
  canvas.height = topHalfHeight;

  context.drawImage(
    imageObj, 0, 0, imgWidth, topHalfHeight, 
    0, 0, imgWidth, topHalfHeight
  );
  context.drawImage(
    imageObj, 0, topHalfHeight, imgWidth, bottomHalfHeight, 
    imgWidth, 0, imgWidth, bottomHalfHeight
  );
};