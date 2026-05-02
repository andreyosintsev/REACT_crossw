import { IMenuMain } from "./menu-main.interface";

import styles from "./menu-mainUI.module.scss";

/**
 * @component Визуальный компонент основного меню страницы
 *
 * @param {Object} IPageMenuMain - Интерфейс пропсов компонента меню
 * @param {Array} menuItems - Массив объектов с пунктами меню
 *
 * @returns {JSX.Element} Визуализированный компонент основного меню
 *
 * @description Базовый UI-компонент, отображающий основное навигационное меню
 * с пунктами, ведущими к различным разделам приложения
 */
const MenuMainUI = ({ menuItems }: IMenuMain) => {
    return (
        <div className={styles.menuMain}>
            <ul className={styles.menuMain__items}>
                {menuItems.map((menuItem, index) => (
                    <li key={index} className={styles.menuMain__item}>
                        <a className={styles.menuMain__link} href={menuItem.link} title={menuItem.title}>
                            {menuItem.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuMainUI;
