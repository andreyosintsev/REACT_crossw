import { ensureAllElements, ensureElement } from "../../scripts/utils";
import ISlider from "./slider.interfase";

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
class Slider implements ISlider {
    protected _wrapper: HTMLElement;
    protected _slider: HTMLElement;
    protected _slides: HTMLElement[];
    protected _buttonLeft: HTMLElement;
    protected _buttonRight: HTMLElement;
    protected _sliderWidth: number;
    protected _slidesWidth: number;
    protected _sliderStart: number;

    constructor(sliderId: string) {
        if (!sliderId) {
            throw new Error("Slider id not supplied as constructor param");
        }

        this._wrapper = ensureElement(`#${sliderId}`);
        if (!this._wrapper) {
            throw new Error("Can not get slider by id");
        }

        this._slider = ensureElement(".slider__items", this._wrapper);
        this._slides = ensureAllElements(".slider__item", this._wrapper);
        this._buttonLeft = ensureElement(".slider-button_left", this._wrapper);
        this._buttonRight = ensureElement(
            ".slider-button_right",
            this._wrapper
        );

        if (
            !(
                this._slider &&
                this._slides.length > 0 &&
                this._buttonLeft &&
                this._buttonRight
            )
        ) {
            throw new Error(
                `Some parts of slider named '${sliderId}' are not found`
            );
        }

        this.init();
    }

    getSlideWidthByNum(slideNum) {
        const marginLeft = Number.parseInt(
            getComputedStyle(this._slides[slideNum], "true").marginLeft
        );
        const marginRight = Number.parseInt(
            getComputedStyle(this._slides[slideNum], "true").marginRight
        );
        return this._slides[slideNum].offsetWidth + marginLeft + marginRight;
    }

    getSlideWidthBySlide(slide) {
        const marginLeft = Number.parseInt(
            getComputedStyle(slide, "true").marginLeft
        );
        const marginRight = Number.parseInt(
            getComputedStyle(slide, "true").marginRight
        );
        return slide.offsetWidth + marginLeft + marginRight;
    }

    init() {
        this._sliderWidth = this._slider.clientWidth;
        this._slidesWidth = 0;
        this._slides.forEach((slide) => {
            console.log(this.getSlideWidthBySlide(slide));
            this._slidesWidth += this.getSlideWidthBySlide(slide);
        });

        this._sliderStart = 0;

        this._slider.scroll({
            top: 0,
            left: this._sliderStart,
            behavior: "smooth",
        });
        this._buttonLeft.addEventListener("click", () => this.slideLeft());
        this._buttonRight.addEventListener("click", () => this.slideRight());
    }

    slideLeft() {
        console.log("sliderLeft()");
        console.log("sliderStart: ", this._sliderStart);
        console.log("sliderWidth: ", this._sliderWidth);
        console.log("slideWidth: ", this.getSlideWidthByNum(0));
        console.log("slidesWidth: ", this._slidesWidth);
        this._sliderStart =
            this._sliderStart - this.getSlideWidthByNum(0) < 0
                ? 0
                : this._sliderStart - this.getSlideWidthByNum(0);
        this._slider.scroll({
            top: 0,
            left: this._sliderStart,
            behavior: "smooth",
        });
    }

    slideRight() {
        console.log("sliderRight()");
        console.log("sliderStart: ", this._sliderStart);
        console.log("sliderWidth: ", this._sliderWidth);
        console.log(
            "slideWidth: ",
            this.getSlideWidthByNum(this._slides.length - 1)
        );
        console.log("slidesWidth: ", this._slidesWidth);
        console.log("slidesNum: ", this._slides.length - 1);

        this._sliderStart =
            this._sliderStart +
                this.getSlideWidthByNum(this._slides.length - 1) +
                this._sliderWidth >
            this._slidesWidth
                ? this._slidesWidth - this._sliderWidth
                : this._sliderStart +
                  this.getSlideWidthByNum(this._slides.length - 1);
        this._slider.scroll({
            top: 0,
            left: this._sliderStart,
            behavior: "smooth",
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Slider("slider-new");
    new Slider("slider-solved");
});
