import { FC } from "react";
import IPageSidebar from "../../page-block/page-block.interface";
import styles from "./page-block.module.scss"

/**
 * @component Визуальный компонент информационного блока страницы
 * 
 * @param {Object} IPageSidebar - Интерфейс пропсов компонента информационного блока
 * @param {string} title - Заголовок информационного блока
 * @param {ReactNode} children - Вложенный контент блока
 * 
 * @returns {JSX.Element} Визуализированный компонент информационного блока
 * 
 * @description Базовый UI-компонент, предназначенный для отображения
 * информационного блока с заголовком и содержимым на странице
 */
const PageBlockUI: FC<IPageSidebar> = ({ title, children }) => {
    return (
        <div className={styles.block}>
            {title && <h2 className="block__title">{title}</h2>}
            {children}
        </div>
    );
};

export default PageBlockUI;