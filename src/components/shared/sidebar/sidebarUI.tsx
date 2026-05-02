import ISidebar from "./sidebar.interface";

import styles from "./sidebarUI.module.scss";

/**
 * @component Визуальный компонент боковой панели приложения
 *
 * @param {Object} ISidebar - Интерфейс пропсов визуального компонента боковой панели
 * @param {ReactNode} children - Вложенный контент для отображения в боковой панели
 *
 * @returns {JSX.Element} Визуализированный компонент боковой панели
 *
 * @description Базовый UI-компонент, представляющий собой боковую панель
 * для размещения дополнительного контента или навигации
 */
const SidebarUI = ({ children }: ISidebar) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebar__ads}>{children}</div>
        </aside>
    );
};

export default SidebarUI;
