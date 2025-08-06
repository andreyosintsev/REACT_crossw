import { FC } from "react";

import IPageAds from "./page-ads.interface";
import styles from "./page-ads.module.scss";

/**
 * @component - компонент рекламного блока
 * @param {ReactNode} children - дополнительный контент (опционально)
 * @returns {JSX.Element} рекламный баннер с возможностью кастомизации
 *
 * @description
 * Компонент отображает рекламный блок с особенностями:
 * - Поддержка дополнительного контента через children
 * - Семантический alt-атрибут для изображения
 * - Готовые стили для позиционирования
 *
 * @see IPageAds Интерфейс входных параметров
 */
const PageAds: FC<IPageAds> = ({ children }) => {
    return (
        <div className={styles.ads}>
            <img src="/imgs/banner-300x800.png" alt="Реклама" />
        </div>
    );
};

export default PageAds;
