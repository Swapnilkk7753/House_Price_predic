
(function(){
  // IMAGES - change/add filenames as needed
  const images = [
    "static/images/house.jpg",
    "static/images/house2.jpg",
    "static/images/house3.jpg"
  ];

  // TEXT TO TYPE
  const headingText = "Welcome to house Price Predicotor"; // exact text you wanted

  // TIMINGS
  const intervalMs = 5000;    // slideshow auto-advance
  const typingDelay = 60;     // ms per character when typing
  const typingPauseAfter = 300; // pause after typing before allowing next change (optional)

  // DOM layers and controls
  const layerA = document.getElementById('bgA');
  const layerB = document.getElementById('bgB');
  const layers = [layerA, layerB];
  const typedHeading = document.getElementById('typed-heading');

  let currentIndex = 0;
  let visibleLayer = 0;
  let timer;

  // preload images
  images.forEach(src => { const img = new Image(); img.src = src; });

  // initialize layers
  layers[0].style.backgroundImage = `url("${images[0]}")`;
  layers[0].classList.add('visible');
  if (images.length > 1) layers[1].style.backgroundImage = `url("${images[1 % images.length]}")`;

  // typing helpers
  let typingTimeouts = []; // to keep track and clear them if needed

  function clearTypingTimeouts(){
    typingTimeouts.forEach(t => clearTimeout(t));
    typingTimeouts = [];
  }

  function typeText(text, speed, onComplete){
    clearTypingTimeouts();
    typedHeading.textContent = ""; // clear
    // type each char
    for (let i = 0; i < text.length; i++){
      const t = setTimeout(() => {
        typedHeading.textContent += text[i];
      }, i * speed);
      typingTimeouts.push(t);
    }
    // call onComplete after last char + small pause
    const finishT = setTimeout(() => {
      if (typeof onComplete === 'function') onComplete();
    }, text.length * speed + typingPauseAfter);
    typingTimeouts.push(finishT);
  }

  // showImage: crossfade and re-type heading
  function showImage(nextIndex){
    const nextLayer = 1 - visibleLayer;

    // set bg for next layer
    layers[nextLayer].style.backgroundImage = `url("${images[nextIndex]}")`;

    // fade
    layers[nextLayer].classList.add('visible');
    layers[visibleLayer].classList.remove('visible');

    // update trackers
    visibleLayer = nextLayer;
    currentIndex = nextIndex;

    // restart typing for heading
    clearTypingTimeouts();
    // small delay to let the crossfade begin so text and image sync pleasantly
    setTimeout(() => {
      typeText(headingText, typingDelay);
    }, 120); // 120ms delay before typing starts (tweak if needed)
  }

  function nextImage(){
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);
    resetTimer();
  }

  function prevImage(){
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);
    resetTimer();
  }

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(nextImage, intervalMs);
  }

  // start auto rotation and initial typing
  timer = setInterval(nextImage, intervalMs);
  // initial typing (small delay so hero loads)
  setTimeout(() => typeText(headingText, typingDelay), 300);

  // wire arrows (make sure buttons are present)
  const nextBtn = document.querySelector('.slide-arrow.next');
  const prevBtn = document.querySelector('.slide-arrow.prev');
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);

  // optional: pause auto-rotation while user hovers on .mimage
  const mimage = document.querySelector('.mimage');
  if (mimage){
    mimage.addEventListener('mouseenter', () => clearInterval(timer));
    mimage.addEventListener('mouseleave', () => resetTimer());
  }

})();