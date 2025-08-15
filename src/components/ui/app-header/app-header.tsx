import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./app-header.module.scss";
import IAppHeaderUI from "./app-header.interface";
import PageLogo from "../../page-logo/page-logo";
import PageMenuMain from "../../page-menu-main/page-menu-main";

/**
 * @component Визуальный компонент заголовка приложения
 * 
 * @param {Object} IAppHeaderUI - Интерфейс пропсов визуального компонента заголовка
 * @param {string} siteName - Название сайта
 * @param {string} logo - URL изображения логотипа
 * @param {Array} menuItems - Массив пунктов основного меню
 * 
 * @returns {JSX.Element} Визуализированный компонент заголовка
 * 
 * @description Базовый UI-компонент, отвечающий за отображение заголовка
 * страницы, включая логотип и основное меню навигации
 */
const AppHeaderUI: FC<IAppHeaderUI> = ({ siteName, logo, menuItems }) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.headertitle}>
                    <Link
                        className={styles.headertitle__link}
                        to="/"
                        title="На главную"
                    >
                        <PageLogo image={logo} title={siteName} />
                    </Link>
                </div>
                <PageMenuMain menuItems={menuItems} />
            </div>
        </header>
    );
};

export default AppHeaderUI;
