import { Link } from "react-router-dom";
import classNames from "classnames";

import ISlider from "./slider.interface";

import styles from "./sliderUI.module.scss";

import imgArrowLeft from "./imgs/arrow_left.png";
import imgArrowRight from "./imgs/arrow_right.png";

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
    return (
        <div className={styles.slider} id="slider-new">
            <div className={classNames(styles.slider__button, styles.sliderbutton_left)}>
                <img className={styles.sliderbutton__image} src={imgArrowLeft} alt="Влево" />
            </div>
            <ul className="slider__items">
                {images.map((image, index) => (
                    <li className={styles.slider__item} key={index}>
                        {
                            <Link className={styles.slider__link} to={image.link} title="Разгадать кроссворд">
                                <img className={styles.slider__image} src={image.src} alt={image.alt} />
                            </Link>
                        }
                    </li>
                ))}
            </ul>
            <div className={classNames(styles.slider__button, styles.sliderbutton_right)}>
                <img className={styles.sliderbutton__image} src={imgArrowRight} alt="Вправо" />
            </div>
        </div>
    );
};

export default SliderUI;
