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
 * - Кнопки навигации .slider-__button_left и .slider__button_right
 *
 * Если какой-либо элемент не найден, выбрасывается исключение
 **/
class Slider {
    el = {};

    constructor(sliderId) {
        if (!sliderId) {
            throw new Error("Slider id not supplied as constructor param");
        }

        this.el.wrapper = document.querySelector(`#${sliderId}`);
        if (!this.el.wrapper) throw new Error("Can not get slider by id");

        this.el.slider = this.el.wrapper.querySelector(".slider__items");
        this.el.slides = Array.from(this.el.wrapper.querySelectorAll(".slider__item"));
        this.el.buttonLeft = this.el.wrapper.querySelector(".slider__button_left");
        this.el.buttonRight = this.el.wrapper.querySelector(".slider__button_right");

        this._validateElements();

        this.init();
    }

    _validateElements() {
        if (!this.el.slider) throw new Error("Slider element not found");
        if (!this.el.slides.length) throw new Error("No slides found");
        if (!this.el.buttonLeft) throw new Error("No left button found");
        if (!this.el.buttonRight) throw new Error("No right button found");
    }

    _calculateSlidesWidth() {
        this.el.slidesWidth = this.el.slides.reduce((acc, slide) => acc + this.getSlideWidthBySlide(slide), 0);
    }

    getSlideWidthByNum(slideNum) {
        const marginLeft = Number.parseInt(getComputedStyle(this.el.slides[slideNum]).marginLeft);
        const marginRight = Number.parseInt(getComputedStyle(this.el.slides[slideNum]).marginRight);
        return this.el.slides[slideNum].offsetWidth + marginLeft + marginRight;
    }

    getSlideWidthBySlide(slide) {
        const style = getComputedStyle(slide);
        return slide.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    }

    init() {
        this.el.sliderWidth = this.el.slider.clientWidth;
        this._calculateSlidesWidth();

        this.el.sliderStart = 0;

        this.el.slider.scroll({
            top: 0,
            left: this.el.sliderStart,
            behavior: "smooth",
        });
        this.el.buttonLeft.addEventListener("click", () => this.slideLeft());
        this.el.buttonRight.addEventListener("click", () => this.slideRight());

        window.addEventListener("resize", () => {
            this.el.sliderWidth = this.el.slider.clientWidth;
            this._calculateSlidesWidth();
        });
    }

    slideLeft() {
        this.el.sliderStart = this.el.sliderStart - this.getSlideWidthByNum(0) < 0 ? 0 : this.el.sliderStart - this.getSlideWidthByNum(0);
        this.el.slider.scroll({
            top: 0,
            left: this.el.sliderStart,
            behavior: "smooth",
        });
    }

    slideRight() {
        const nextSlideWidth = this.getSlideWidthByNum(this.el.slides.length - 1);
        let nextStart = this.el.sliderStart + nextSlideWidth;
        nextStart = Math.min(nextStart, this.el.slidesWidth - this.el.sliderWidth);

        this.el.sliderStart = nextStart;

        this.el.slider.scroll({
            top: 0,
            left: this.el.sliderStart,
            behavior: "smooth",
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Slider("slider-new");
    new Slider("slider-solved");
});
