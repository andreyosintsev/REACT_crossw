import { FC } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import classNames from "classnames";

import styles from "./page-slider.module.scss";

import imgArrowLeft from "./imgs/arrow_left.png";
import imgArrowRight from "./imgs/arrow_right.png";
import IPageSlider from "../../page-slider/page-slider.interface";

/**
 * @component Визуальный компонент слайдера
 * 
 * @param {Object} IPageSlider - Интерфейс пропсов компонента слайдера
 * @param {Array} images - Массив объектов с изображениями для слайдера
 * 
 * @returns {JSX.Element} Визуализированный компонент слайдера
 * 
 * @description Базовый UI-компонент для отображения слайдера изображений
 * с возможностью навигации влево/вправо
 */
const PageSliderUI: FC<IPageSlider> = ({ images }) => {
    return (
        <div className={styles.slider} id="slider-new">
            <div
                className={classNames(
                    styles.slider__button,
                    styles.sliderbutton_left
                )}
            >
                <img
                    className={styles.sliderbutton__image}
                    src={imgArrowLeft}
                    alt="Влево"
                />
            </div>
            <ul className="slider__items">
                {images.map((image) => (
                    <li className={styles.slider__item} key={uuid()}>
                        {
                            <Link
                                className={styles.slider__link}
                                to={image.link}
                                title="Разгадать кроссворд"
                            >
                                <img
                                    className={styles.slider__image}
                                    src={image.src}
                                    alt={image.alt}
                                />
                            </Link>
                        }
                    </li>
                ))}
            </ul>
            <div
                className={classNames(
                    styles.slider__button,
                    styles.sliderbutton_right
                )}
            >
                <img
                    className={styles.sliderbutton__image}
                    src={imgArrowRight}
                    alt="Вправо"
                />
            </div>
        </div>
    );
};

export default PageSliderUI;
