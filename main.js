const redraw = () => {
  const originalImage = document.querySelector("img");
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const imageObj = new Image();
  const gamebar = document.querySelector(".gamebar");

  let landscape = true;
  let splitPercentage = parseFloat(localStorage.getItem('splitPercentage')) || 0.5;

  originalImage.addEventListener('load', () => {
    imageObj.src = originalImage.src;
    originalImage.parentElement.replaceChild(canvas, originalImage);
    imageObj.addEventListener('load', drawImage);
  });

  const drawImage = () => {
    const { width: imgWidth, height: imgHeight } = originalImage;
    const topHalfHeight = imgHeight * splitPercentage;
    const bottomHalfHeight = imgHeight - topHalfHeight;

    if (landscape) {
      canvas.width = imgWidth * 2;
      canvas.height = topHalfHeight;

      context.drawImage(imageObj, 0, 0, imgWidth, topHalfHeight, 0, 0, imgWidth, topHalfHeight);
      context.drawImage(imageObj, 0, topHalfHeight, imgWidth, bottomHalfHeight, imgWidth, 0, imgWidth, bottomHalfHeight);
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;

      context.drawImage(imageObj, 0, 0, imgWidth, imgHeight);
    }
  }

  const switchOrientationButton = document.createElement('button');
  switchOrientationButton.textContent = 'Switch Orientation';
  gamebar.appendChild(switchOrientationButton);

  switchOrientationButton.addEventListener('click', () => {
    landscape = !landscape;
    drawImage();
  });

  const splitPercentageLabel = document.createElement('span');
  splitPercentageLabel.textContent = 'Split %';
  splitPercentageLabel.style.color = 'white';
  gamebar.appendChild(splitPercentageLabel);

  const splitPercentageSlider = document.createElement('input');
  splitPercentageSlider.type = 'range';
  splitPercentageSlider.min = '0';
  splitPercentageSlider.max = '100';
  splitPercentageSlider.value = `${splitPercentage * 100}`;
  gamebar.appendChild(splitPercentageSlider);

  splitPercentageSlider.addEventListener('input', () => {
    splitPercentage = splitPercentageSlider.value / 100;
    localStorage.setItem('splitPercentage', `${splitPercentage}`);
    drawImage();
  });
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    redraw();
  }
});

let oldHref = document.location.href;

const bodyList = document.querySelector("body");
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
      redraw();
    }
  });
});

const config = {
  childList: true,
  subtree: true
};

observer.observe(bodyList, config);

redraw();