import { FC } from "react";

import IPageButtonMenuMobile from "./page-button-menu-mobile.interface";
import PageButtonMenuMobileUI from "../ui/page-button-menu-mobile/page-button-menu-mobile";

/**
 * @component Функциональный компонент кнопки отображения мобильного меню
 *
 * @param {Object} IPageButtonMenuMobile - Интерфейс пропсов компонента кнопки
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Текстовый заголовок, сопровождающий логотип
 *
 * @returns {JSX.Element} Визуализированный компонент логотипа страницы
 *
 * @description Компонент представляет собой блок с логотипом и заголовком,
 * который может использоваться для визуального оформления страницы
 */
const PageButtonMenuMobile: FC<IPageButtonMenuMobile> = () => <PageButtonMenuMobileUI></PageButtonMenuMobileUI>;

export default PageButtonMenuMobile;
