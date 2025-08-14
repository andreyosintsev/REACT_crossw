import { FC } from "react";

import { IPageMenuMain } from "./page-menu-main.interface";
import PageMenuMainUI from "../ui/page-menu-main/page-menu-main";

/**
 * @component Функциональный компонент основного меню страницы
 * 
 * @param {Object} IPageMenuMain - Интерфейс пропсов компонента основного меню
 * @param {Array} menuItems - Массив объектов, содержащих пункты меню
 * 
 * @returns {JSX.Element} Визуализированный компонент основного меню с пунктами навигации
 * 
 * @description Компонент представляет собой контейнер для отображения основного меню
 * навигации на странице приложения. Принимает массив пунктов меню для рендеринга
 */
const PageMenuMain: FC<IPageMenuMain> = ({ menuItems }) => (
    <PageMenuMainUI menuItems={menuItems}></PageMenuMainUI>
)

export default PageMenuMain;
