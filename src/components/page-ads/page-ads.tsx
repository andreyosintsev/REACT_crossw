import { FC } from "react";

import IPageAds from "./page-ads.interface";
import PageAdsUI from "../ui/page-ads/page-ads";

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
const PageAds: FC<IPageAds> = ({ children }) => (
    <PageAdsUI>{children}</PageAdsUI>
)

export default PageAds;
