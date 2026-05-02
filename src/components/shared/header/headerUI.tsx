import { Link } from "react-router-dom";

import IHeaderUI from "./headerUI.interface";
import styles from "./headerUI.module.scss";

import Logo from "../logo/logo";
import MenuMain from "../menu-main/menu-main";
import MenuMobileButton from "../menu-mobile/menu-mobile-button/menu-mobile-button";

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
const HeaderUI = ({ siteName, logo, menuItems }: IHeaderUI) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__title}>
                    <Link className={styles.header__link} to="/" title="На главную">
                        <Logo image={logo} title={siteName} />
                    </Link>
                </div>
                <MenuMain menuItems={menuItems} />
                <MenuMobileButton />
            </div>
        </header>
    );
};

export default HeaderUI;
