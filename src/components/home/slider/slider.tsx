import ISlider from "./slider.interface";

import SliderUI from "./sliderUI";

/**
 * @component Функциональный компонент слайдера страницы
 *
 * @param {Object} ISlider - Интерфейс пропсов компонента слайдера
 * @param {Array} images - Массив URL-адресов изображений для слайдера
 *
 * @returns {JSX.Element} Визуализированный компонент слайдера с изображениями
 *
 * @description Компонент представляет собой карусель изображений (слайдер),
 * который используется для отображения серии изображений на странице
 */
const PageSlider = ({ images }: ISlider) => <SliderUI images={images}></SliderUI>;

export default PageSlider;
