import MenuMobileButtonUI from "./menu-mobile-buttonUI";

import storeApp from "../../../../store/storeApp/storeApp";

/**
 * @component Функциональный компонент кнопки отображения мобильного меню
 *
 * @param {Object} IMenuMobileButton - Интерфейс пропсов компонента кнопки
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Текстовый заголовок, сопровождающий логотип
 *
 * @returns {JSX.Element} Визуализированный компонент логотипа страницы
 *
 * @description Компонент представляет собой блок с логотипом и заголовком,
 * который может использоваться для визуального оформления страницы
 */

const MenuMobileButton = () => {
    const isOpen = storeApp((state) => state.isMenuMobileOpen);
    const toggle = storeApp((state) => state.setMenuMobile);

    return <MenuMobileButtonUI isOpen={isOpen} toggle={toggle} />;
};

export default MenuMobileButton;
