import { useEffect, useRef } from "react";
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

    const sliderStart = useRef(0);
    const sliderWidth = useRef(0);
    const slidesWidth = useRef(0);

    const getSlideWidth = (slide: HTMLLIElement) => {
        const style = getComputedStyle(slide);
        return slide.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    };

    const calculateSlidesWidth = () => {
        slidesWidth.current = slidesRef.current.reduce((acc, slide) => acc + getSlideWidth(slide), 0);
    };

    useEffect(() => {
        if (!sliderRef.current) return;

        sliderWidth.current = sliderRef.current.clientWidth;
        calculateSlidesWidth();

        sliderRef.current.scroll({
            left: sliderStart.current,
            behavior: "smooth",
        });

        const handleResize = () => {
            if (!sliderRef.current) return;
            sliderWidth.current = sliderRef.current.clientWidth;
            calculateSlidesWidth();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const slideLeft = () => {
        if (!sliderRef.current || !slidesRef.current.length) return;

        const step = getSlideWidth(slidesRef.current[0]);

        sliderStart.current = sliderStart.current - step < 0 ? 0 : sliderStart.current - step;

        sliderRef.current.scroll({
            left: sliderStart.current,
            behavior: "smooth",
        });
    };

    const slideRight = () => {
        if (!sliderRef.current || !slidesRef.current.length) return;

        const step = getSlideWidth(slidesRef.current[slidesRef.current.length - 1]);

        let nextStart = sliderStart.current + step;
        nextStart = Math.min(nextStart, slidesWidth.current - sliderWidth.current);

        sliderStart.current = nextStart;

        sliderRef.current.scroll({
            left: sliderStart.current,
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.slider} id="slider-new">
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
                        <a className={styles.slider__link} href={image.link} title="Кроссворд № 1"></a>
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
