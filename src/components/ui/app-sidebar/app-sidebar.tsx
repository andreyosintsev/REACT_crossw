import { FC } from "react";

import styles from "./app-sidebar.module.scss";
import IAppSidebar from "../../app-sidebar/app-sidebar.interface";

/**
 * @component Визуальный компонент боковой панели приложения
 * 
 * @param {Object} IAppSidebar - Интерфейс пропсов визуального компонента боковой панели
 * @param {ReactNode} children - Вложенный контент для отображения в боковой панели
 * 
 * @returns {JSX.Element} Визуализированный компонент боковой панели
 * 
 * @description Базовый UI-компонент, представляющий собой боковую панель
 * для размещения дополнительного контента или навигации
 */
const AppSidebarUI: FC<IAppSidebar> = ({ children }) => {
    return <aside className={styles.sidebar}>{children}</aside>;
};

export default AppSidebarUI;
