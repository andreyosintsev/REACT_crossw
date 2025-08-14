import { FC } from "react";

import IPageLogo from "./page-logo.interface";
import PageLogoUI from "../ui/page-logo/page-logo";

/**
 * @component Функциональный компонент логотипа страницы
 * 
 * @param {Object} IPageLogo - Интерфейс пропсов компонента логотипа
 * @param {string} image - URL изображения логотипа
 * @param {string} title - Текстовый заголовок, сопровождающий логотип
 * 
 * @returns {JSX.Element} Визуализированный компонент логотипа страницы
 * 
 * @description Компонент представляет собой блок с логотипом и заголовком,
 * который может использоваться для визуального оформления страницы
 */
const PageLogo: FC<IPageLogo> = ({ image, title }) => (
    <PageLogoUI image={image} title={title}></PageLogoUI>
)
export default PageLogo;
