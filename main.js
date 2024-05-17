const originalImage = document.getElementsByTagName("img")[0];
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const imageObj = new Image();
const gamebar = document.getElementsByClassName("gamebar")[0];

var landscape = true;
var splitPercentage = 0.5;

// Get splitPercentage from localStorage
splitPercentage = localStorage.getItem('splitPercentage');
if (splitPercentage === null) {
  splitPercentage = 0.5; // Default value
} else {
  splitPercentage = parseFloat(splitPercentage);
}

// Load the original image into the new image object
originalImage.onload = function() {
    imageObj.src = originalImage.src;
    originalImage.parentElement.replaceChild(canvas, originalImage);
};

// Handle the loading of the image object
imageObj.onload = function() {
  drawImage();
};

// Function to draw the image in landscape orientation
function drawImage() {
  const imgWidth = originalImage.width;
  const imgHeight = originalImage.height;
  const topHalfHeight = imgHeight * splitPercentage;
  const bottomHalfHeight = imgHeight - topHalfHeight;

  if (landscape) {
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
  } else {
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    context.drawImage(imageObj, 0, 0, imgWidth, imgHeight);
  }
}

// Create and add the switch orientation button
const switchOrientationButton = document.createElement('button');
switchOrientationButton.innerText = 'Switch Orientation';
gamebar.appendChild(switchOrientationButton);

switchOrientationButton.addEventListener('click', function() {
  landscape = !landscape;
  drawImage();
});

// Create and add the split percentage label
const splitPercentageLabel = document.createElement('span');
splitPercentageLabel.textContent = 'Split %';
splitPercentageLabel.style.color = 'white';
gamebar.appendChild(splitPercentageLabel);

// Create and add the split percentage slider
const splitPercentageSlider = document.createElement('input');
splitPercentageSlider.type = 'range';
splitPercentageSlider.min = '0';
splitPercentageSlider.max = '100';
splitPercentageSlider.value = (splitPercentage * 100).toString();
gamebar.appendChild(splitPercentageSlider);

splitPercentageSlider.addEventListener('input', function() {
  splitPercentage = splitPercentageSlider.value / 100;
  localStorage.setItem('splitPercentage', splitPercentage.toString());
  drawImage();
});