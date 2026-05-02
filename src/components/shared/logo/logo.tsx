import ILogo from "./logo.interface";

import LogoUI from "./logoUI";

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
const Logo = ({ image, title }: ILogo) => <LogoUI image={image} title={title}></LogoUI>;

export default Logo;
