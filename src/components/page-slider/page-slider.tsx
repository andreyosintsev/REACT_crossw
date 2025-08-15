import { FC } from "react";

import IPageSlider from "./page-slider.interface";

import PageSliderUI from "../ui/page-slider/page-slider";

/**
 * @component Функциональный компонент слайдера страницы
 * 
 * @param {Object} IPageSlider - Интерфейс пропсов компонента слайдера
 * @param {Array} images - Массив URL-адресов изображений для слайдера
 * 
 * @returns {JSX.Element} Визуализированный компонент слайдера с изображениями
 * 
 * @description Компонент представляет собой карусель изображений (слайдер),
 * который используется для отображения серии изображений на странице
 */
const PageSlider: FC<IPageSlider> = ({ images }) => (
    <PageSliderUI images={images}></PageSliderUI>
)

export default PageSlider;
