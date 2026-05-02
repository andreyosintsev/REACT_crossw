import { ReactNode } from "react";

import AdsUI from "./adsUI";

/**
 * @component Функциональный компонент рекламного блока страницы
 *
 * @param {Object} IPageAds - Интерфейс пропсов компонента рекламного блока
 * @param {ReactNode} children - Вложенные элементы с рекламным контентом
 *
 * @returns {JSX.Element} Визуализированный компонент рекламного блока с контентом
 *
 * @description Компонент представляет собой контейнер для размещения рекламных материалов
 * на странице приложения. Принимает вложенные элементы для отображения рекламы
 */

interface IAds {
    children?: ReactNode;
}

const Ads = ({ children }: IAds) => <AdsUI>{children}</AdsUI>;

export default Ads;
