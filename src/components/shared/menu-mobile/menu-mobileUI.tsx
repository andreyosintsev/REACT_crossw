import { IMenuMobile } from "./menu-mobile";

import Backdrop from "../backdrop/backdrop";

import styles from "./menu-mobileUI.module.scss";

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

export interface IMenuMobileUI extends IMenuMobile {
    isOpen: boolean;
    onClick: () => void;
}

const MenuMobileUI = ({ menuItems, title, isOpen, onClick }: IMenuMobileUI) => {
    const style = isOpen ? styles.menuMobile : styles.menuMobile + " " + styles.menuMobile_hidden;

    return (
        <div className={style} onClick={onClick}>
            {title && <div className={styles.menuMobile__title}>{title}</div>}

            <ul className={styles.menuMobile__items}>
                {menuItems.map((menuItem, index) => (
                    <li key={index} className={styles.menuMobile__item}>
                        <a className={styles.menuMobile__link} href={menuItem.link} title={menuItem.title}>
                            {menuItem.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuMobileUI;
