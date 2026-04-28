import { FC } from "react";
import IPageButtonMenuMobile from "../../page-button-menu-mobile/page-button-menu-mobile.interface";
import styles from "./page-button-menu-mobile.module.scss";

/**
 * @component Визуальный компонент кнопки мобильного меню
 *
 * @param {Object} IPageButtonmenuMobile - Интерфейс пропсов компонента кнопки мобильного меню
 *
 * @returns {JSX.Element} Визуализированный компонент кнопки мобильного меню
 *
 * @description Базовый UI-компонент, предназначенный для отображения
 * кнопки мобильного меню в заголовке страницы
 */
const PageButtonMenuMobileUI: FC<IPageButtonMenuMobile> = () => {
    return (
        <div className={styles.buttonMenuMobile}>
            <svg
                className={styles.buttonMenuMobile__icon}
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                filter="url(#shadow)"
            >
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0, 0, 0, 1)" />
                    </filter>
                </defs>

                <line className={styles.buttonMenuMobile__icon_line1} y1="2" x2="26" y2="2" />
                <line className={styles.buttonMenuMobile__icon_line2} y1="12" x2="26" y2="12" />
                <path className={styles.buttonMenuMobile__icon_line3} d="M0 23H30" />
            </svg>
        </div>
    );
};

export default PageButtonMenuMobileUI;
