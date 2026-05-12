import cn from "classnames";

import IBlock from "./block.interface";
import styles from "./blockUI.module.scss";

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
const BlockUI = ({ title, children, variant = "text" }: IBlock) => {
    return (
        <div className={cn(styles.block, styles[`block__${variant}`])}>
            {title && <h2 className={styles.block__title}>{title}</h2>}
            {children}
        </div>
    );
};

export default BlockUI;
