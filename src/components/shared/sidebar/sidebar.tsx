import ISidebar from "./sidebar.interface";

import SidebarUI from "./sidebarUI";

/**
 * @component Функциональный компонент боковой панели приложения
 * @param {Object} ISidebar - Интерфейс пропсов компонента боковой панели
 * @param {ReactNode} children - Вложенные элементы для отображения в боковой панели
 *
 * @description Компонент представляет собой контейнер для боковой панели приложения
 * и принимает вложенные элементы через пропс children
 */

const Sidebar = ({ children }: ISidebar) => {
    return <SidebarUI>{children}</SidebarUI>;
};

export default Sidebar;
