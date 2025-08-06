import { FC } from "react";
import { v4 as uuid } from "uuid";

import IPageMenuMain from "./page-menu-main.interface";
import styles from "./page-menu-main.module.scss";

/**
 * @component - Компонент главного меню навигации сайта
 * @param {Array<{link: string, title: string}>} menuItems - Массив пунктов меню
 * @returns {JSX.Element} Навигационное меню сайта
 *
 * @description
 * Компонент реализует главное меню навигации с:
 * - Семантической HTML-разметкой
 * - Поддержкой произвольного количества пунктов
 * - Title-атрибутами для доступности
 * - Генерацией уникальных ключей для каждого элемента
 *
 * @features
 * 1. Гибкость через передачу пунктов меню в props
 * 2. Поддержка accessibility (title атрибуты)
 * 3. Оптимизированный рендеринг списка
 *
 * @see IPageMenuMain Интерфейс входных параметров
 **/
const PageMenuMain: FC<IPageMenuMain> = ({ menuItems }) => {
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

export default PageMenuMain;
