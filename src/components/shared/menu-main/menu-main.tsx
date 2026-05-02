import { IMenuMain } from "./menu-main.interface";

import MenuMainUI from "./menu-mainUI";

/**
 * @component Функциональный компонент основного меню страницы
 *
 * @param {Object} IMenuMain - Интерфейс пропсов компонента основного меню
 * @param {Array} menuItems - Массив объектов, содержащих пункты меню
 *
 * @returns {JSX.Element} Визуализированный компонент основного меню с пунктами навигации
 *
 * @description Компонент представляет собой контейнер для отображения основного меню
 * навигации на странице приложения. Принимает массив пунктов меню для рендеринга
 */

const MenuMain = ({ menuItems }: IMenuMain) => <MenuMainUI menuItems={menuItems}></MenuMainUI>;

export default MenuMain;
