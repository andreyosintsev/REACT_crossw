/**
 * @class - Класс для управления слайдером изображений
 * @param {string} sliderId - ID контейнера слайдера
 * @throws {Error} Если не передан ID или элементы слайдера не найдены
 * 
 * @description
 * Реализует функциональность горизонтального слайдера с:
 * - Плавной прокруткой
 * - Кнопками навигации (влево/вправо)
 * - Автоматическим расчетом размеров
 * - Ограничением прокрутки по краям
 * 
 * @requires
 * HTML-структура должна содержать:
 * - Основной контейнер с ID
 * - Элемент .slider__items для контента
 * - Элементы .slider__item для слайдов
 * - Кнопки .slider-button_left и .slider-button_right
**/
class Slider {
    constructor (sliderId) {
        if (!sliderId) {
            throw new Error('Slider id not supplied as constructor param');
        }
        
        this.wrapper = document.querySelector(`#${sliderId}`);
        if (!this.wrapper) {
            throw new Error('Can not get slider by id');
        }

        this.slider = this.wrapper.querySelector('.slider__items');
        this.slides = this.wrapper.querySelectorAll('.slider__item');
        this.buttonLeft = this.wrapper.querySelector('.slider-button_left');
        this.buttonRight = this.wrapper.querySelector('.slider-button_right');

        if (!(this.slider && this.slides.length > 0 && this.buttonLeft && this.buttonRight)) {
            throw new Error(`Some parts of slider named '${sliderId}' are not found`);
        };

        this.init();
    }

    getSlideWidthByNum(slideNum) {
        const marginLeft = Number.parseInt(getComputedStyle(this.slides[slideNum], true).marginLeft);
        const marginRight = Number.parseInt(getComputedStyle(this.slides[slideNum], true).marginRight);
        return this.slides[slideNum].offsetWidth + marginLeft + marginRight;   
    }

    getSlideWidthBySlide(slide) {
        const marginLeft = Number.parseInt(getComputedStyle(slide, true).marginLeft);
        const marginRight = Number.parseInt(getComputedStyle(slide, true).marginRight);
        return slide.offsetWidth + marginLeft + marginRight;   
    }

    init() {
        this.sliderWidth = this.slider.clientWidth;
        this.slidesWidth = 0
        this.slides.forEach(slide => {
            console.log(this.getSlideWidthBySlide(slide));
            this.slidesWidth += this.getSlideWidthBySlide(slide);
        })
        
        this.sliderStart = 0;


        this.slider.scroll({top: 0, left: this.sliderStart, behavior: "smooth"});
        this.buttonLeft.addEventListener('click', () => this.slideLeft());
        this.buttonRight.addEventListener('click', () => this.slideRight());
    }

    slideLeft() {
        console.log('sliderLeft()');
        console.log('sliderStart: ', this.sliderStart);
        console.log('sliderWidth: ', this.sliderWidth);
        console.log('slideWidth: ', this.getSlideWidthByNum(0));
        console.log('slidesWidth: ', this.slidesWidth);
        this.sliderStart = (this.sliderStart - this.getSlideWidthByNum(0)) < 0 ? 0 : this.sliderStart - this.getSlideWidthByNum(0);
        this.slider.scroll({top: 0, left: this.sliderStart, behavior: "smooth"});
    }

    slideRight() {
        console.log('sliderRight()');
        console.log('sliderStart: ', this.sliderStart);
        console.log('sliderWidth: ', this.sliderWidth);
        console.log('slideWidth: ', this.getSlideWidthByNum(this.slides.length - 1));
        console.log('slidesWidth: ', this.slidesWidth);
        console.log('slidesNum: ', this.slides.length -1 );

        this.sliderStart = this.sliderStart + this.getSlideWidthByNum(this.slides.length - 1) + this.sliderWidth > this.slidesWidth ? this.slidesWidth - this.sliderWidth : this.sliderStart + this.getSlideWidthByNum(this.slides.length - 1);
        this.slider.scroll({top: 0, left: this.sliderStart, behavior: "smooth"});
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider('slider-new');
    new Slider('slider-solved');
})