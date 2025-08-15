import { FC } from "react";

import IAppSidebar from "./app-sidebar.interface";
import AppSidebarUI from "../ui/app-sidebar/app-sidebar";

/**
 * @component Функциональный компонент боковой панели приложения
 * @param {Object} IAppSidebar - Интерфейс пропсов компонента боковой панели
 * @param {ReactNode} children - Вложенные элементы для отображения в боковой панели
 * 
 * @description Компонент представляет собой контейнер для боковой панели приложения
 * и принимает вложенные элементы через пропс children
 */

const AppSidebar: FC<IAppSidebar> = ({ children }) => {
    return <AppSidebarUI>{children}</AppSidebarUI>
};

export default AppSidebar;
