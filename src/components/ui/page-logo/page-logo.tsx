import { FC } from "react";

import styles from "./page-logo.module.scss";
import IPageLogo from "../../page-logo/page-logo.interface";

/**
 * @component Визуальный компонент логотипа страницы
 * 
 * @param {Object} IPageLogo - Интерфейс пропсов компонента логотипа
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Название приложения/сайта
 * 
 * @returns {JSX.Element} Визуализированный компонент логотипа
 * 
 * @description Базовый UI-компонент, отображающий логотип и название
 * приложения/сайта в едином стилевом решении
 */
const PageLogoUI: FC<IPageLogo> = ({ image, title }) => {
    return (
        <>
            <img className={styles.logo} src={image} alt={title} />
            <div className={styles.title}>{title}</div>
        </>
    );
};

export default PageLogoUI;
