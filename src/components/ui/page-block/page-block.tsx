import { FC } from "react";
import IPageBlock from "../../page-block/page-block.interface";
import styles from "./page-block.module.scss";

/**
 * @component Визуальный компонент информационного блока страницы
 *
 * @param {Object} IPageBlock - Интерфейс пропсов компонента информационного блока
 * @param {string} title - Заголовок информационного блока
 * @param {ReactNode} children - Вложенный контент блока
 *
 * @returns {JSX.Element} Визуализированный компонент информационного блока
 *
 * @description Базовый UI-компонент, предназначенный для отображения
 * информационного блока с заголовком и содержимым на странице
 */
const PageBlockUI: FC<IPageBlock> = ({ title, children, variant = "text" }) => {
    return (
        <div className={styles.block}>
            {title && <h2 className={styles.block__title}>{title}</h2>}

            <div className={`${styles[`block__${variant}`]}`}> {children}</div>
        </div>
    );
};

export default PageBlockUI;
