'use strict';
class Slider {
  constructor(slides, currentIndex = 0) {
    this._slides = slides;
    this.currentIndex = currentIndex;
  }
  set currentIndex(v) {
    if (typeof v !== 'number') {
      throw new TypeError();
    }
    if (
      Number.isNaN(v) ||
      !Number.isSafeInteger(v) ||
      v < 0 ||
      v >= this._slides.length
    ) {
      throw new RangeError();
    }
    this._currentIndex = v;
  }
  get currentIndex() {
    return this._currentIndex;
  }
  get prevIndex() {
    return (this._currentIndex - 1 + this._slides.length) % this._slides.length;
  }
  get nextIndex() {
    return (this._currentIndex + 1) % this._slides.length;
  }
  get currentSlide() {
    return this._slides[this._currentIndex];
  }
  delaySlide(direction, elem, delay) {

    const self = this;

    return function(backImg, delay, timeBackImg) {
      let opacityLevel = 0;

      elem.setAttribute('src', backImg);
      self.currentIndex = self[direction === 'next' ? 'nextIndex' : 'prevIndex'];

      for (let i = 0; i <= 100; i++) {
        setTimeout( () => {
          if ( i >= timeBackImg ) {
            elem.setAttribute('src', self.currentSlide);
          };
  
          elem.style.opacity = `${i * 0.01}`;
        }, i === 0 ? delay : i * delay);
      };
  
    };
  }
}
