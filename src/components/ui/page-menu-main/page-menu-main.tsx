import { FC } from "react";
import { v4 as uuid } from "uuid";

import styles from "./page-menu-main.module.scss";
import { IPageMenuMain } from "../../page-menu-main/page-menu-main.interface";

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
const PageMenuMainUI: FC<IPageMenuMain> = ({ menuItems }) => {
    return (
        <div className={styles.menumain}>
            <ul className={styles.menumain__items}>
                {menuItems.map((menuItem) => (
                    <li key={uuid()} className={styles.menumain__item}>
                        <a
                            className={styles.menumain__link}
                            href={menuItem.link}
                            title={menuItem.title}
                        >
                            {menuItem.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageMenuMainUI;
