import { FC } from 'react';
import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';

import IPageSlider from './page-slider.interface';
import styles from './page-slider.module.scss';

import imgArrowLeft from './imgs/arrow_left.png';
import imgArrowRight from './imgs/arrow_right.png';

/**
 * Компонент слайдера для отображения кроссвордов
 * 
 * @component
 * @param {Array<{src: string, alt: string, link: string}>} images - Массив изображений для слайдера
 * @returns {JSX.Element} Интерактивный слайдер с изображениями кроссвордов
 * 
 * @description
 * Компонент реализует слайдер изображений с:
 * - Кнопками навигации (влево/вправо)
 * - Ссылками на страницы кроссвордов
 * - Адаптивным отображением изображений
 * 
 * @features
 * 1. Генерация уникальных ключей для каждого элемента
 * 2. Поддержка ARIA-атрибутов (через alt)
 * 3. Анимации переключения (реализуются через CSS)
 * 
 * @note
 * Для работы слайдера требуется подключение соответствующих CSS-стилей
 * 
 * @see Link Компонент ссылки из react-router-dom
 * @see classNames Утилита для объединения классов
 */
const PageSlider: FC<IPageSlider> = ({ images }) => {
  return (
    <div className={styles.slider} id="slider-new">
      {/* Кнопка переключения влево */}
      <div className={classNames(styles.slider__button, styles.sliderbutton_left)}>
        <img
          className={styles.sliderbutton__image}
          src={imgArrowLeft}
          alt="Влево"
        />
      </div>
      {/* Список элементов слайдера */}
      <ul className="slider__items">
        {
          images.map(image =>
            <li className={styles.slider__item} key={uuid()}>
              {
                <Link className={styles.slider__link} to={image.link} title="Разгадать кроссворд">

                  <img className={styles.slider__image} src={image.src} alt={image.alt} />

                </Link>

              }
            </li>
          )
        }
      </ul>
      {/* Кнопка переключения вправо */}
      <div className={classNames(styles.slider__button, styles.sliderbutton_right)}>
        <img
          className={styles.sliderbutton__image}
          src={imgArrowRight}
          alt="Вправо"
        />
      </div>
    </div>
  )
}

export default PageSlider