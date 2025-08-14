import { FC } from "react";

import styles from "./page-ads.module.scss";
import IPageAds from "../../page-ads/page-ads.interface";

/**
 * @component Визуальный компонент рекламного блока страницы
 * 
 * @param {Object} IPageAds - Интерфейс пропсов компонента рекламного блока
 * @param {ReactNode} children - Вложенный рекламный контент
 * 
 * @returns {JSX.Element} Визуализированный компонент рекламного блока
 * 
 * @description Базовый UI-компонент, предназначенный для отображения
 * рекламного контента на странице приложения
 */
const PageAdsUI: FC<IPageAds> = ({ children }) => {
    return (
        <div className={styles.ads}>
            <img src="/imgs/banner-300x800.png" alt="Реклама" />
        </div>
    );
};

export default PageAdsUI;
