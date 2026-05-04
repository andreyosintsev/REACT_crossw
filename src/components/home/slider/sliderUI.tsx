import { useRef } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import ISlider from "./slider.interface";

import styles from "./sliderUI.module.scss";

/**
 * @component Визуальный компонент слайдера
 *
 * @param {Object} ISlider - Интерфейс пропсов компонента слайдера
 * @param {Array} images - Массив объектов с изображениями для слайдера
 *
 * @returns {JSX.Element} Визуализированный компонент слайдера
 *
 * @description Базовый UI-компонент для отображения слайдера изображений
 * с возможностью навигации влево/вправо
 */
const SliderUI = ({ images }: ISlider) => {
    const sliderRef = useRef<HTMLUListElement | null>(null);
    const slidesRef = useRef<HTMLLIElement[]>([]);

    const getSlideWidth = (slide: HTMLLIElement) => {
        const style = getComputedStyle(slide);
        return slide.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    };

    const slideLeft = () => {
        if (!sliderRef.current || !slidesRef.current.length) return;

        const step = getSlideWidth(slidesRef.current[0]);

        sliderRef.current.scrollBy({
            left: -step,
            behavior: "smooth",
        });
    };

    const slideRight = () => {
        if (!sliderRef.current || !slidesRef.current.length) return;

        const step = getSlideWidth(slidesRef.current[0]);

        sliderRef.current.scrollBy({
            left: step,
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.slider}>
            <div className={cn(styles.slider__button, styles.slider__button_left)} onClick={slideLeft}>
                <img className={styles.slider__image} src="/images/slider/arrow_left.svg" alt="<" />
            </div>
            <ul className={styles.slider__items} ref={sliderRef}>
                {images.map((image, index) => (
                    <li
                        key={index}
                        className={styles.slider__item}
                        ref={(el) => {
                            if (el) slidesRef.current[index] = el;
                        }}
                    >
                        <div className={styles.slider__content}>
                            <img className={styles.slider__image} src={image.src} alt={image.alt} />
                            <div className={styles.slider__info}>{image.alt}</div>
                        </div>
                        <Link className={styles.slider__link} to={image.link} title="Кроссворд № 1"></Link>
                    </li>
                ))}
            </ul>
            <div className={cn(styles.slider__button, styles.slider__button_right)} onClick={slideRight}>
                <img className={styles.slider__image} src="/images/slider/arrow_right.svg" alt=">" />
            </div>
        </div>
    );
};

export default SliderUI;
