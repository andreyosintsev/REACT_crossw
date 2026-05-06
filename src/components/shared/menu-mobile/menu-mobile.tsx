import { IMenuItem } from "../../../types/menu";

import MenuMobileUI from "./menu-mobileUI";

import storeApp from "../../../store/storeApp/storeApp";

/**
 * @component Функциональный компонент мобильного меню страницы
 *
 * @param {Object} IMenuMobile - Интерфейс пропсов компонента мобильного меню меню
 * @param {Array} menuItems - Массив объектов, содержащих пункты меню
 *
 * @returns {JSX.Element} Визуализированный компонент мобильного меню с пунктами навигации
 *
 * @description Компонент представляет собой контейнер для отображения основного меню
 * навигации на странице приложения. Принимает массив пунктов меню для рендеринга
 */

export interface IMenuMobile {
    menuItems: IMenuItem[];
    title?: string;
}

const MenuMobile = ({ menuItems, title }: IMenuMobile) => {
    const isOpen = storeApp((state) => state.isMenuMobileOpen);
    const closeAllOverlays = storeApp((state) => state.closeAllOverlays);

    return <MenuMobileUI menuItems={menuItems} title={title} isOpen={isOpen} onClick={() => closeAllOverlays()} />;
};

export default MenuMobile;
