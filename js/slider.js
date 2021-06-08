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
 
  /**
   * @param {Object} object объект с различными свойствами
   * 
   * @param {string} object.direction - параметр, принимающий направление слайда
   * @param {object} object.imageElement - картинка
   * @param {string} object.backImg - фон на время перехода от одной картинки к другой
   * @param {number} object.delay - показатель задержки перехода от одной картинки к другой (произвольная величина)
   * @param {number} object.timeBackImg - показатель времени фона перехода от одной картинки к другой (произвольная величина)
   * 
   * @returns {undefined} nothing
   */
  delaySlide = ({
    direction = 'next',
    imageElement,
    backImg = 'https://74foto.ru/wp-content/uploads/foto-belyj-fon-bez-risunka_44.jpg',
    delay = 10,
    timeBackImg = 70,
  }) => 
  e => {
    let opacityLevel = 0;

    imageElement.setAttribute('src', backImg);
    this.currentIndex = this[direction === 'next' ? 'nextIndex' : 'prevIndex'];

    for (let i = 1; i <= 100; i++) {
      setTimeout( () => {
        if ( i === timeBackImg ) {
          imageElement.setAttribute('src', this.currentSlide);
        };
        
        imageElement.style.opacity = `${i * 0.01}`;
      }, i === 0 ? delay : i * delay);
    };
  };
};
